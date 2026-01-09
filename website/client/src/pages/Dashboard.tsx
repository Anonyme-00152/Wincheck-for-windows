import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Cpu, HardDrive, Zap, Wifi, AlertTriangle, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface SystemMetrics {
  cpu: number;
  ram: number;
  ramTotal: number;
  disk: number;
  diskFree: number;
  networkDown: number;
  networkUp: number;
  temperature?: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 0,
    ram: 0,
    ramTotal: 16000,
    disk: 0,
    diskFree: 500,
    networkDown: 0,
    networkUp: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching metrics - will be replaced with actual API calls
    const timer = setTimeout(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 80),
        ram: Math.floor(Math.random() * 100),
        ramTotal: 16000,
        disk: Math.floor(Math.random() * 85),
        diskFree: Math.floor(Math.random() * 500),
        networkDown: Math.floor(Math.random() * 100),
        networkUp: Math.floor(Math.random() * 50),
        temperature: 45 + Math.floor(Math.random() * 20),
      });
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (value: number) => {
    if (value < 50) return "text-green-400";
    if (value < 75) return "text-yellow-400";
    return "text-red-400";
  };

  const MetricCard = ({
    icon: Icon,
    label,
    value,
    unit,
    percentage,
    warning,
  }: {
    icon: React.ReactNode;
    label: string;
    value: number | string;
    unit: string;
    percentage?: number;
    warning?: boolean;
  }) => (
    <Card className="tech-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-accent">{Icon}</div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {label}
            </p>
          </div>
        </div>
        {warning && <AlertTriangle className="w-5 h-5 text-destructive" />}
      </div>

      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${getStatusColor(percentage || 0)}`}>
            {value}
          </span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </div>

      {percentage !== undefined && (
        <div className="space-y-2">
          <Progress value={percentage} className="h-2" />
          <p className="text-xs text-muted-foreground">{percentage}% utilisé</p>
        </div>
      )}
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-accent text-lg font-semibold">
          Chargement des métriques...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Tableau de Bord</h1>
          <p className="text-muted-foreground">Surveillance en temps réel du système</p>
        </div>

        {/* Main metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Cpu className="w-6 h-6" />}
            label="Processeur"
            value={metrics.cpu}
            unit="%"
            percentage={metrics.cpu}
            warning={metrics.cpu > 80}
          />

          <MetricCard
            icon={<Zap className="w-6 h-6" />}
            label="Mémoire"
            value={metrics.ram}
            unit="%"
            percentage={metrics.ram}
            warning={metrics.ram > 85}
          />

          <MetricCard
            icon={<HardDrive className="w-6 h-6" />}
            label="Disque"
            value={metrics.disk}
            unit="%"
            percentage={metrics.disk}
            warning={metrics.disk > 90}
          />

          <MetricCard
            icon={<Wifi className="w-6 h-6" />}
            label="Réseau"
            value={`${metrics.networkDown}/${metrics.networkUp}`}
            unit="Mbps"
          />
        </div>

        {/* Secondary metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="tech-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Détails Mémoire
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">RAM Utilisée</span>
                <span className="font-semibold text-foreground">
                  {Math.round((metrics.ram / 100) * metrics.ramTotal)} MB
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">RAM Totale</span>
                <span className="font-semibold text-foreground">
                  {metrics.ramTotal} MB
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">RAM Libre</span>
                <span className="font-semibold text-accent">
                  {Math.round(((100 - metrics.ram) / 100) * metrics.ramTotal)} MB
                </span>
              </div>
            </div>
          </Card>

          <Card className="tech-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-accent" />
              Détails Stockage
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Espace Utilisé</span>
                <span className="font-semibold text-foreground">
                  {Math.round((metrics.disk / 100) * 1000)} GB
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Espace Libre</span>
                <span className="font-semibold text-accent">{metrics.diskFree} GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Capacité Totale</span>
                <span className="font-semibold text-foreground">
                  {Math.round((metrics.disk / 100) * 1000) + metrics.diskFree} GB
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick actions */}
        <Card className="tech-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Actions Rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-accent text-accent-foreground hover:opacity-90">
              Analyser Disque
            </Button>
            <Button className="bg-accent text-accent-foreground hover:opacity-90">
              Nettoyer Registre
            </Button>
            <Button className="bg-accent text-accent-foreground hover:opacity-90">
              Optimiser Services
            </Button>
            <Button className="bg-accent text-accent-foreground hover:opacity-90">
              Générer Rapport
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
