"use client";

import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Building, Save, Camera, Mail, Globe, Loader2 } from 'lucide-react';
import { createClient } from '@/espace/lib/supabase/client';

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState('profil');
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
          setProfile({ email: user.email, ...data });
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres Avancés</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez vos préférences et paramètres de compte.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            <TabButton 
              active={activeTab === 'profil'} 
              onClick={() => setActiveTab('profil')} 
              icon={<User className="w-5 h-5 mr-3" />} 
              label="Profil" 
            />
            <TabButton 
              active={activeTab === 'notifications'} 
              onClick={() => setActiveTab('notifications')} 
              icon={<Bell className="w-5 h-5 mr-3" />} 
              label="Notifications" 
            />
            <TabButton 
              active={activeTab === 'securite'} 
              onClick={() => setActiveTab('securite')} 
              icon={<Shield className="w-5 h-5 mr-3" />} 
              label="Sécurité" 
            />
            <TabButton 
              active={activeTab === 'entreprise'} 
              onClick={() => setActiveTab('entreprise')} 
              icon={<Building className="w-5 h-5 mr-3" />} 
              label="Entreprise" 
            />
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              {activeTab === 'profil' && <ProfilTab profile={profile} />}
              {activeTab === 'notifications' && <NotificationsTab />}
              {activeTab === 'securite' && <SecuriteTab />}
              {activeTab === 'entreprise' && <EntrepriseTab profile={profile} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
        active 
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 font-medium' 
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ProfilTab({ profile }: { profile: any }) {
  const initials = (profile?.prenom?.[0] || '') + (profile?.nom?.[0] || '');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Informations du profil</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mettez à jour vos informations personnelles.</p>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold uppercase">
              {initials || 'JD'}
            </div>
            <button className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-2 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
              Changer l'avatar
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">JPG, GIF ou PNG. Max 1MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prénom</label>
            <input type="text" defaultValue={profile?.prenom || ''} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
            <input type="text" defaultValue={profile?.nom || ''} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input type="email" defaultValue={profile?.email || ''} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" disabled />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
            <textarea rows={4} defaultValue={profile?.bio || ''} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <button className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          <Save className="w-4 h-4 mr-2" />
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Préférences de notifications</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Choisissez comment vous souhaitez être informé.</p>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700 pt-6 space-y-6">
        <NotificationOption 
          title="Emails de la plateforme" 
          description="Recevez des résumés quotidiens de l'activité de votre espace."
          defaultChecked={true}
        />
        <NotificationOption 
          title="Mentions et commentaires" 
          description="Soyez notifié lorsque quelqu'un vous mentionne ou répond à votre commentaire."
          defaultChecked={true}
        />
        <NotificationOption 
          title="Nouveaux documents" 
          description="Alertes lorsqu'un nouveau document est partagé dans votre groupe."
          defaultChecked={false}
        />
        <NotificationOption 
          title="Mises à jour de sécurité" 
          description="Alertes importantes concernant votre compte (obligatoire)."
          defaultChecked={true}
          disabled={true}
        />
      </div>

      <div className="pt-6 flex justify-end">
        <button className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          <Save className="w-4 h-4 mr-2" />
          Mettre à jour
        </button>
      </div>
    </div>
  );
}

function NotificationOption({ title, description, defaultChecked, disabled = false }: { title: string, description: string, defaultChecked: boolean, disabled?: boolean }) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-1 pr-6">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>
      <div className="flex-shrink-0 pt-1">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked={defaultChecked} disabled={disabled} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
}

function SecuriteTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sécurité du compte</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gérez vos mots de passe et sécurisez votre compte.</p>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700 pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Changer le mot de passe</h3>
          <div className="grid grid-cols-1 gap-4 max-w-md">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de passe actuel</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nouveau mot de passe</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmer le nouveau mot de passe</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
          </div>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
            Mettre à jour le mot de passe
          </button>
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-500" />
                Authentification à deux facteurs (2FA)
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
                Ajoutez une couche de sécurité supplémentaire à votre compte en demandant plus qu'un simple mot de passe pour vous connecter.
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
              Activer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EntrepriseTab({ profile }: { profile: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Paramètres de l'entreprise</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gérez les informations et préférences de votre organisation.</p>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700 pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom de l'entreprise</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" defaultValue={profile?.entreprise || "SICA"} className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Web</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input type="url" defaultValue="https://techcorp.example.com" className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Numéro d'immatriculation</label>
            <input type="text" defaultValue="123 456 789" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adresse de facturation</label>
            <textarea rows={3} defaultValue="123 Avenue des Champs-Élysées, 75008 Paris, France" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <button className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder les réglages
        </button>
      </div>
    </div>
  );
}
