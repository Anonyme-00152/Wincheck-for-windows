import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, HardDrive, Zap, Settings, BarChart3, Cpu } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-accent text-lg font-semibold">
          Chargement...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
        {/* Technical header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cpu className="w-12 h-12 text-accent" />
            <h1 className="text-5xl font-bold text-foreground">WinCheck</h1>
          </div>
          <p className="text-xl text-muted-foreground font-light tracking-wide">
            Gestion et Optimisation Système Professionnelle
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-12">
          <Card className="tech-card p-6 hover:border-accent transition-colors">
            <Activity className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-2">Tableau de Bord</h3>
            <p className="text-sm text-muted-foreground">
              Surveillance en temps réel des métriques système (CPU, RAM, disque, réseau)
            </p>
          </Card>

          <Card className="tech-card p-6 hover:border-accent transition-colors">
            <BarChart3 className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-2">Analyse Complète</h3>
            <p className="text-sm text-muted-foreground">
              Détection matérielle et analyse des performances système
            </p>
          </Card>

          <Card className="tech-card p-6 hover:border-accent transition-colors">
            <HardDrive className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-2">Nettoyage</h3>
            <p className="text-sm text-muted-foreground">
              Suppression de fichiers temporaires et nettoyage de registre
            </p>
          </Card>

          <Card className="tech-card p-6 hover:border-accent transition-colors">
            <Zap className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-2">Optimisation IA</h3>
            <p className="text-sm text-muted-foreground">
              Recommandations intelligentes basées sur l'analyse système
            </p>
          </Card>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => (window.location.href = getLoginUrl())}
          className="px-8 py-6 text-lg font-bold bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
        >
          Se Connecter pour Commencer
        </Button>

        {/* Technical footer */}
        <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Interface de gestion système professionnelle avec authentification sécurisée</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Bienvenue, {user?.name}
          </h1>
          <p className="text-muted-foreground">Tableau de bord de gestion système WinCheck</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick access cards */}
          <Card className="tech-card p-6 cursor-pointer hover:border-accent transition-colors">
            <Activity className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-2">Tableau de Bord</h3>
            <p className="text-sm text-muted-foreground">
              Voir les métriques en temps réel
            </p>
          </Card>

          <Card className="tech-card p-6 cursor-pointer hover:border-accent transition-colors">
            <Cpu className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-2">Processus</h3>
            <p className="text-sm text-muted-foreground">
              Gérer les processus actifs
            </p>
          </Card>

          <Card className="tech-card p-6 cursor-pointer hover:border-accent transition-colors">
            <HardDrive className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-2">Nettoyage</h3>
            <p className="text-sm text-muted-foreground">
              Analyser et nettoyer le disque
            </p>
          </Card>

          <Card className="tech-card p-6 cursor-pointer hover:border-accent transition-colors">
            <Settings className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-2">Services</h3>
            <p className="text-sm text-muted-foreground">
              Optimiser les services Windows
            </p>
          </Card>

          <Card className="tech-card p-6 cursor-pointer hover:border-accent transition-colors">
            <Zap className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-2">Démarrage</h3>
            <p className="text-sm text-muted-foreground">
              Gérer les programmes au démarrage
            </p>
          </Card>

          <Card className="tech-card p-6 cursor-pointer hover:border-accent transition-colors">
            <BarChart3 className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-2">Rapports</h3>
            <p className="text-sm text-muted-foreground">
              Consulter l'historique des scans
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
