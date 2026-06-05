"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Info } from "lucide-react";

// Mock contacts as requested (no fake chat history)
const contacts = [
  {
    id: 1,
    name: "NGORAN IVAN",
    role: "Directeur Général (DG)",
    avatar: "NI",
    online: true,
  },
  {
    id: 2,
    name: "Richard",
    role: "Ingénieur de Structure",
    avatar: "RI",
    online: true,
  },
  {
    id: 3,
    name: "Anthony Koueni",
    role: "Informaticien (IT)",
    avatar: "AK",
    online: true,
  },
];

export default function MessageriePage() {
  const [selectedContactId, setSelectedContactId] = useState<number | null>(contacts[0].id);
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const selectedContact = contacts.find((c) => c.id === selectedContactId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;
    // In a real app, send the message to the backend here
    // For now, since we have no mock data in the conversation, we just clear the input
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Messagerie</h1>
        <p className="text-sm text-slate-500 mt-1">Communiquez avec vos ingénieurs et collaborateurs</p>
      </div>

      <div className="flex flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0 border-r border-slate-200 bg-slate-50/50 flex flex-col">
          {/* Sidebar Search */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un contact..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContactId(contact.id)}
                className={`w-full flex items-center p-4 border-b border-slate-100 transition-colors hover:bg-slate-100 ${
                  selectedContactId === contact.id ? "bg-blue-50/50 hover:bg-blue-50/80" : ""
                }`}
              >
                <div className="relative mr-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg flex-shrink-0 ${
                    selectedContactId === contact.id 
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/20" 
                      : "bg-slate-200 text-slate-600"
                  }`}>
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-slate-900">{contact.name}</div>
                  <div className="text-xs text-slate-500 truncate">{contact.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between bg-white flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-medium mr-3">
                    {selectedContact.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{selectedContact.name}</h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      {selectedContact.online ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          En ligne
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                          Hors ligne
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-slate-400">
                  <button className="hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50">
                    <Video className="w-5 h-5" />
                  </button>
                  <div className="w-px h-6 bg-slate-200 mx-2"></div>
                  <button className="hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-100">
                    <Info className="w-5 h-5" />
                  </button>
                  <button className="hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-100">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages List (Empty state as requested) */}
              <div className="flex-1 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-50 p-6 flex flex-col justify-end relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent"></div>
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 max-w-md mx-auto relative z-10">
                  <div className="w-24 h-24 bg-blue-50/50 rounded-full flex items-center justify-center mb-2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-bold text-2xl shadow-inner">
                      {selectedContact.avatar}
                    </div>
                  </div>
                  <h4 className="text-xl font-medium text-slate-800">
                    Discutez avec {selectedContact.name}
                  </h4>
                  <p className="text-slate-500 text-sm">
                    Ceci est le début de votre historique de messages avec {selectedContact.name} ({selectedContact.role}).
                  </p>
                  <div className="px-4 py-1.5 bg-slate-200/50 rounded-full text-xs text-slate-500 font-medium">
                    Aujourd'hui
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-slate-200">
                <form 
                  onSubmit={handleSendMessage}
                  className="flex items-end gap-2 bg-slate-100/80 rounded-2xl p-2 border border-slate-200 focus-within:border-blue-400 focus-within:bg-white transition-all focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                >
                  <button 
                    type="button"
                    className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex-shrink-0"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleTextareaInput}
                    placeholder="Écrivez votre message..."
                    className="w-full max-h-32 min-h-[44px] bg-transparent resize-none outline-none py-3 px-2 text-slate-700 placeholder-slate-400 leading-relaxed"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                  
                  <button 
                    type="submit"
                    disabled={message.trim() === ""}
                    className={`p-3 rounded-xl flex-shrink-0 transition-all duration-200 ${
                      message.trim() === "" 
                        ? "text-slate-400 bg-slate-200/50 cursor-not-allowed" 
                        : "text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 active:scale-95"
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
                <div className="text-center mt-3 text-xs text-slate-400 flex items-center justify-center gap-1">
                  <span>Appuyez sur</span>
                  <kbd className="font-sans px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-500 font-medium">Entrée ↵</kbd> 
                  <span>pour envoyer,</span>
                  <kbd className="font-sans px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-500 font-medium">Maj + Entrée</kbd> 
                  <span>pour passer à la ligne.</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-2">Vos messages</h3>
              <p className="text-slate-500 text-center max-w-sm">
                Sélectionnez un contact dans la liste pour commencer une conversation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
