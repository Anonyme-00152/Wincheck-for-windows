import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cpu, Search, X, AlertTriangle } from "lucide-react";
import { useState, useMemo } from "react";

interface Process {
  id: number;
  name: string;
  cpu: number;
  memory: number;
  status: string;
}

export default function Processes() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"cpu" | "memory" | "name">("cpu");

  // Mock data - will be replaced with actual API calls
  const processes: Process[] = [
    { id: 1, name: "System", cpu: 15, memory: 256, status: "running" },
    { id: 2, name: "explorer.exe", cpu: 8, memory: 512, status: "running" },
    { id: 3, name: "chrome.exe", cpu: 45, memory: 2048, status: "running" },
    { id: 4, name: "vscode.exe", cpu: 12, memory: 1024, status: "running" },
    { id: 5, name: "node.exe", cpu: 25, memory: 768, status: "running" },
    { id: 6, name: "svchost.exe", cpu: 5, memory: 128, status: "running" },
  ];

  const filteredProcesses = useMemo(() => {
    let filtered = processes.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortBy === "cpu") return b.cpu - a.cpu;
      if (sortBy === "memory") return b.memory - a.memory;
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [searchTerm, sortBy]);

  const getProcessColor = (cpu: number) => {
    if (cpu < 20) return "text-green-400";
    if (cpu < 50) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Cpu className="w-8 h-8 text-accent" />
            Gestionnaire de Processus
          </h1>
          <p className="text-muted-foreground">
            Surveillance et gestion des processus actifs
          </p>
        </div>

        {/* Controls */}
        <Card className="tech-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher un processus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input text-foreground border-border"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setSortBy("cpu")}
                variant={sortBy === "cpu" ? "default" : "outline"}
                className={sortBy === "cpu" ? "bg-accent text-accent-foreground" : ""}
              >
                Trier par CPU
              </Button>
              <Button
                onClick={() => setSortBy("memory")}
                variant={sortBy === "memory" ? "default" : "outline"}
                className={sortBy === "memory" ? "bg-accent text-accent-foreground" : ""}
              >
                Trier par RAM
              </Button>
            </div>

            <div className="flex gap-2">
              <Button className="bg-accent text-accent-foreground hover:opacity-90 flex-1">
                Actualiser
              </Button>
              <Button className="bg-destructive text-destructive-foreground hover:opacity-90 flex-1">
                Terminer Processus
              </Button>
            </div>
          </div>
        </Card>

        {/* Processes Table */}
        <Card className="tech-card p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm uppercase">
                  Processus
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-sm uppercase">
                  CPU %
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-sm uppercase">
                  RAM (MB)
                </th>
                <th className="text-center py-3 px-4 font-semibold text-muted-foreground text-sm uppercase">
                  État
                </th>
                <th className="text-center py-3 px-4 font-semibold text-muted-foreground text-sm uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProcesses.map((process) => (
                <tr
                  key={process.id}
                  className="border-b border-border hover:bg-card/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {process.cpu > 50 && (
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                      )}
                      <span className="font-medium text-foreground">
                        {process.name}
                      </span>
                    </div>
                  </td>
                  <td className={`py-3 px-4 text-right font-semibold ${getProcessColor(process.cpu)}`}>
                    {process.cpu}%
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-foreground">
                    {process.memory}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-3 py-1 rounded text-xs font-semibold bg-accent/20 text-accent">
                      {process.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button
                      size="sm"
                      className="bg-destructive text-destructive-foreground hover:opacity-90"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProcesses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Aucun processus trouvé
            </div>
          )}
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="tech-card p-6">
            <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
              Total Processus
            </p>
            <p className="text-3xl font-bold text-accent">{processes.length}</p>
          </Card>

          <Card className="tech-card p-6">
            <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
              CPU Moyen
            </p>
            <p className="text-3xl font-bold text-accent">
              {(processes.reduce((sum, p) => sum + p.cpu, 0) / processes.length).toFixed(1)}%
            </p>
          </Card>

          <Card className="tech-card p-6">
            <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
              RAM Utilisée
            </p>
            <p className="text-3xl font-bold text-accent">
              {(processes.reduce((sum, p) => sum + p.memory, 0) / 1024).toFixed(1)} GB
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
