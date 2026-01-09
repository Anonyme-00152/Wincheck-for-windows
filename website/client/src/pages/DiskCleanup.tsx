import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HardDrive, Trash2, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface CleanupItem {
  id: string;
  name: string;
  size: number;
  category: string;
  checked: boolean;
}

export default function DiskCleanup() {
  const { user } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [cleanupItems, setCleanupItems] = useState<CleanupItem[]>([
    { id: "1", name: "Fichiers Temporaires", size: 2500, category: "temp", checked: true },
    { id: "2", name: "Cache Navigateur", size: 1800, category: "cache", checked: true },
    { id: "3", name: "Fichiers Journaux", size: 950, category: "logs", checked: true },
    { id: "4", name: "Fichiers Téléchargés Anciens", size: 3200, category: "downloads", checked: false },
    { id: "5", name: "Fichiers Supprimés (Corbeille)", size: 1500, category: "trash", checked: true },
    { id: "6", name: "Fichiers Temporaires Windows", size: 2100, category: "windows", checked: true },
  ]);

  const totalSize = cleanupItems.reduce((sum, item) => sum + (item.checked ? item.size : 0), 0);
  const selectedCount = cleanupItems.filter(item => item.checked).length;

  const handleToggleItem = (id: string) => {
    setCleanupItems(items =>
      items.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleSelectAll = () => {
    setCleanupItems(items => items.map(item => ({ ...item, checked: true })));
  };

  const handleDeselectAll = () => {
    setCleanupItems(items => items.map(item => ({ ...item, checked: false })));
  };

  const handleScan = async () => {
    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsScanning(false);
  };

  const handleCleanup = async () => {
    setIsRunning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsRunning(false);
    setCleanupItems(items => items.filter(item => !item.checked));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <HardDrive className="w-8 h-8 text-accent" />
            Nettoyage de Disque
          </h1>
          <p className="text-muted-foreground">
            Analysez et nettoyez les fichiers inutiles
          </p>
        </div>

        {/* Summary */}
        <Card className="tech-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                Espace à Récupérer
              </p>
              <p className="text-3xl font-bold text-accent">{formatSize(totalSize)}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                Éléments Sélectionnés
              </p>
              <p className="text-3xl font-bold text-accent">{selectedCount}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                Total Éléments
              </p>
              <p className="text-3xl font-bold text-accent">{cleanupItems.length}</p>
            </div>
          </div>
        </Card>

        {/* Controls */}
        <Card className="tech-card p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="bg-accent text-accent-foreground hover:opacity-90"
            >
              {isScanning ? "Analyse en cours..." : "Analyser Disque"}
            </Button>
            <Button
              onClick={handleCleanup}
              disabled={isRunning || selectedCount === 0}
              className="bg-destructive text-destructive-foreground hover:opacity-90"
            >
              {isRunning ? "Nettoyage en cours..." : "Nettoyer"}
            </Button>
            <div className="flex-1" />
            <Button
              onClick={handleSelectAll}
              variant="outline"
              className="border-border text-foreground hover:bg-card"
            >
              Tout Sélectionner
            </Button>
            <Button
              onClick={handleDeselectAll}
              variant="outline"
              className="border-border text-foreground hover:bg-card"
            >
              Tout Désélectionner
            </Button>
          </div>
        </Card>

        {/* Items List */}
        <Card className="tech-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Fichiers à Nettoyer</h3>
          <div className="space-y-3">
            {cleanupItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded border border-border hover:bg-card/50 transition-colors cursor-pointer"
                onClick={() => handleToggleItem(item.id)}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggleItem(item.id)}
                  className="w-5 h-5 rounded border-border bg-input cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-accent">{formatSize(item.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Info */}
        <Card className="tech-card p-6 mt-8 bg-card/50 border-accent/20">
          <div className="flex gap-4">
            <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-foreground mb-1">Conseil de Sécurité</p>
              <p className="text-sm text-muted-foreground">
                Une sauvegarde est automatiquement créée avant le nettoyage. Assurez-vous que les fichiers à supprimer ne sont pas importants.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
