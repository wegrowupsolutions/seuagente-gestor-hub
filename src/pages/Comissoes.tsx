import { useState } from "react";
import { Wallet, CheckCircle, Download, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const mockComissoes = {
  aReceber: 750.00,
  totalRecebido: 5200.00,
  transacoes: [
    {
      id: 1,
      data: "2025-07-15",
      tipo: "Agendamento Qualificado",
      cliente: "João da Silva",
      descricao: "Agendamento de João da Silva",
      valor: 50.00,
      statusPagamento: "Pendente"
    },
    {
      id: 2,
      data: "2025-07-14",
      tipo: "Venda Fechada",
      cliente: "Ana Costa",
      descricao: "Venda - Estética & Cia",
      valor: 200.00,
      statusPagamento: "Pendente"
    },
    {
      id: 3,
      data: "2025-07-01",
      tipo: "Recorrência Mensal",
      cliente: "Maria Souza",
      descricao: "Mensalidade Jul/2025 - Clínica Sorria Mais",
      valor: 15.00,
      statusPagamento: "Pago"
    },
    {
      id: 4,
      data: "2025-06-28",
      tipo: "Venda Fechada",
      cliente: "Maria Souza",
      descricao: "Venda - Clínica Sorria Mais",
      valor: 300.00,
      statusPagamento: "Pago"
    },
    {
      id: 5,
      data: "2025-06-20",
      tipo: "Agendamento Qualificado",
      cliente: "Pedro Santos",
      descricao: "Agendamento de Pedro Santos",
      valor: 50.00,
      statusPagamento: "Cancelado"
    }
  ]
};

export default function Comissoes() {
  const [tipoFilter, setTipoFilter] = useState("Todos");
  const [periodoFilter, setPeriodoFilter] = useState("Mês Atual");
  const { toast } = useToast();

  const filteredTransacoes = mockComissoes.transacoes.filter(transacao => {
    return tipoFilter === "Todos" || transacao.tipo === tipoFilter;
  });

  const downloadExtrato = () => {
    toast({
      title: "Extrato gerado!",
      description: "O arquivo será baixado em instantes.",
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Pago":
        return "success";
      case "Pendente":
        return "warning";
      case "Cancelado":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minhas Comissões</h1>
          <p className="text-muted-foreground">Acompanhe seus ganhos em tempo real</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-sm font-medium">Comissão a Receber</CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Valor acumulado de comissões por agendamentos qualificados e vendas fechadas ainda não pagos.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                R$ {mockComissoes.aReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">próximo pagamento</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-sm font-medium">Total Recebido (Histórico)</CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Soma de todas as comissões pagas até o momento.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                R$ {mockComissoes.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">desde o início</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">Extrato de Comissões</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Filtrar por Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Agendamento Qualificado">Agendamento Qualificado</SelectItem>
                  <SelectItem value="Venda Fechada">Venda Fechada</SelectItem>
                  <SelectItem value="Recorrência Mensal">Recorrência</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={periodoFilter} onValueChange={setPeriodoFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mês Atual">Mês Atual</SelectItem>
                  <SelectItem value="Mês Anterior">Mês Anterior</SelectItem>
                  <SelectItem value="Últimos 3 meses">Últimos 3 meses</SelectItem>
                  <SelectItem value="Ano Atual">Ano Atual</SelectItem>
                  <SelectItem value="Todos">Todos</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={downloadExtrato} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Baixar Extrato
              </Button>
            </div>

            {/* Transactions Table */}
            {filteredTransacoes.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Data</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Tipo de Comissão</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Cliente</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Descrição</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Valor</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status do Pagamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransacoes.map((transacao) => (
                      <tr key={transacao.id} className="border-b border-border/50">
                        <td className="p-3 text-sm text-muted-foreground">
                          {new Date(transacao.data).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-3 text-sm text-foreground">{transacao.tipo}</td>
                        <td className="p-3 text-sm text-foreground">{transacao.cliente}</td>
                        <td className="p-3 text-sm text-muted-foreground">{transacao.descricao}</td>
                        <td className="p-3 text-sm font-medium text-foreground">
                          R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-3">
                          <Badge variant={getStatusVariant(transacao.statusPagamento)}>
                            {transacao.statusPagamento}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhuma comissão registrada ainda. Comece a vender para ver seus ganhos!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}