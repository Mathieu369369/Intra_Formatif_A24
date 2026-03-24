import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatButtonModule]
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor(){
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();

    // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite
    this.isConnected = true;

    this.hubConnection!.on('UpdateNbUsers', (data: number) => {
      this.nbUsers = data;
        // data a le même type que ce qui a été envoyé par le serveur
        console.log(data);
    });

    this.hubConnection!.on('UpdatePizzaPrice', (data: number) => {
      this.pizzaPrice = data;
    });

    // Écouter l'argent seul (envoyé lors du AddMoney)
    this.hubConnection!.on('UpdateMoney', (data: number) => {
      this.money = data;
    });

    // Écouter le combo Pizzas + Argent (envoyé lors du Select ET du BuyPizza)
    this.hubConnection!.on('UpdateNbPizzasAndMoney', (nb: number, m: number) => {
      this.nbPizzas = nb;
      this.money = m;
    });

    this.hubConnection
        .start()
        .then(() => {
            console.log('La connexion est active!');
          })
        .catch(err => console.log('Error while starting connection: ' + err));
  }





  selectChoice(selectedChoice:number) {
    this.selectedChoice = selectedChoice;

    this.hubConnection?.invoke('selectChoice', selectedChoice).catch(er => console.error(er))
    console.log(this.hubConnection)
  }

  unselectChoice() {
    if(this.selectedChoice !== -1)    this.hubConnection?.invoke("UnselectChoice", this.selectedChoice).catch(er => console.error(er))

    this.selectedChoice = -1;
    this.pizzaPrice = 0;
    this.money = 0;
    this.nbPizzas = 0;

    console.log('unselectChoice')
  }

  addMoney() {
    this.hubConnection?.invoke('AddMoney', this.selectedChoice).catch(er => console.error(er))
    console.log('Added money')
  }

  buyPizza() {
    this.hubConnection?.invoke('BuyPizza', this.selectedChoice).catch(er => console.error(er))
    console.log('pizz achete')
  }
}
