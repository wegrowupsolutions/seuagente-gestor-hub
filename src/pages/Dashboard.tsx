import { useState } from "react";
import { UserCheck, DollarSign, PiggyBank, Copy, ExternalLink, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const mockData = {
  leadsQualificados: 25,
  vendasFechadas: 3,
  comissaoEstimada: 1500.00,
  gestorId: "GS123456",
  atividadeRecente: [
    { data: "2025-07-15", cliente: "João da Silva", evento: "Lead qualificou-se", tipo: "lead" },
    { data: "2025-07-14", cliente: "Barbearia Cortes & Estilos", evento: "Venda fechada", tipo: "venda" },
    { data: "2025-07-13", cliente: "Maria Santos", evento: "Lead qualificou-se", tipo: "lead" },
    { data: "2025-07-12", cliente: "Salão Beleza Total", evento: "Agendamento marcado", tipo: "agendamento" },
    { data: "2025-07-11", cliente: "Pedro Oliveira", evento: "Lead qualificou-se", tipo: "lead" },
  ]
};

export default function Dashboard() {
  const { toast } = useToast();
  const referralLink = `https://seuagente.ai/parceria?ref=${mockData.gestorId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    }
  };

  const openLink = () => {
    window.open(referralLink, "_blank");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard do Gestor</h1>
        <p className="text-muted-foreground">Visão geral da sua performance</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Qualificados no Mês</CardTitle>
            <UserCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockData.leadsQualificados}</div>
            <div className="flex items-center space-x-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+5% vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Fechadas no Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockData.vendasFechadas}</div>
            <div className="flex items-center space-x-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+1</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comissão Estimada no Mês</CardTitle>
            <PiggyBank className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {mockData.comissaoEstimada.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center space-x-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+R$ 200,00</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link Section */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-xl">Meu Link de Indicação</CardTitle>
          <CardDescription>
            Compartilhe para Começar a Vender!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Use seu link exclusivo para direcionar clientes potenciais para nossa página de qualificação automatizada.
          </p>
          
          <div className="flex items-center space-x-2">
            <div className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono text-foreground border">
              {referralLink}
            </div>
            <Button onClick={copyToClipboard} variant="outline" size="sm">
              <Copy className="h-4 w-4" />
              Copiar Link
            </Button>
            <Button onClick={openLink} variant="outline" size="sm">
              <ExternalLink className="h-4 w-4" />
              Testar Link
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-xl">Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockData.atividadeRecente.map((atividade, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{atividade.evento}</p>
                  <p className="text-xs text-muted-foreground">{atividade.cliente}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(atividade.data).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="link" className="p-0">
              Ver Mais Atividades
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}