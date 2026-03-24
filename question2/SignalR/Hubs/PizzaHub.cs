using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            _pizzaManager.AddUser();
            // On avertit TOUT LE MONDE du nouveau nombre d'utilisateurs
            await Clients.All.SendAsync("UpdateNbUsers", _pizzaManager.NbConnectedUsers);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _pizzaManager.RemoveUser();
            await Clients.All.SendAsync("UpdateNbUsers", _pizzaManager.NbConnectedUsers);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            string groupname = _pizzaManager.GetGroupName(choice);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupname);

            int prix = _pizzaManager.PIZZA_PRICES[(int)choice];
            int totalMoney = _pizzaManager.Money[(int)choice];
            int NbPizz = _pizzaManager.NbPizzas[(int)choice];


            await Clients.Caller.SendAsync("UpdatePizzaPrice", prix);
            await Clients.Caller.SendAsync("UpdateNbPizzasAndMoney",NbPizz,totalMoney);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            string groupname = _pizzaManager.GetGroupName(choice);

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupname);

            await Clients.Caller.SendAsync("UpdatePizzaPrice", 0);
            await Clients.Caller.SendAsync("UpdateNbPizzasAndMoney", 0, 0);
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            string groupname = _pizzaManager.GetGroupName(choice);
            _pizzaManager.IncreaseMoney(choice);

            await Clients.Group(groupname).SendAsync("UpdateMoney", _pizzaManager.Money[(int)choice]);
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            _pizzaManager.BuyPizza(choice);

            string groupname = _pizzaManager.GetGroupName(choice);

            await Clients.Group(groupname).SendAsync("UpdateNbPizzasAndMoney", _pizzaManager.NbPizzas[(int)choice], _pizzaManager.Money[(int)choice]);
        }
    }
}
