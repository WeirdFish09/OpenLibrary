using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OpenLibraryServer.Service.Interfaces;

namespace OpenLibraryServer.Service
{
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;

        public ChatHub(IChatService chatService)
        {
            _chatService = chatService;
        }

        public async Task JoinChat(Guid chatId)
        {
            var messages = _chatService.GetMessagesByChat(chatId);
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
            await Clients.Caller.SendAsync("ReceiveMessageHistory", await messages);
        }
        
        public Task LeaveChat(Guid chatId)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, chatId.ToString());
        }
        
        public async Task SendMessage(Guid userId, Guid chatId, string message)
        {
            var messageTO = _chatService.AddMessage(message, userId, chatId);
            await Clients.Group(chatId.ToString()).SendAsync("ReceiveMessage", await messageTO);
        }
    }
}