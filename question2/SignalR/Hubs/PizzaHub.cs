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
            await base.OnConnectedAsync();
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            string groupname = _pizzaManager.GetGroupName(choice);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupname);

            int prix = _pizzaManager.PIZZA_PRICES[(int)choice];
            int totalMoney = _pizzaManager.Money[(int)choice];
            int NbPizz = _pizzaManager.NbPizzas[(int)choice];

            await Clients.Caller.SendAsync("UpdatePizzaPrice", prix);
            await Clients.Caller.SendAsync("UpdateNbPizzasAndMoney ",NbPizz,totalMoney);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
        }

        public async Task AddMoney(PizzaChoice choice)
        {
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
        }
    }
}
