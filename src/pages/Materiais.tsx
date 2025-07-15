import { Download, Eye, FileText, Video, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const mockMateriais = [
  {
    id: 1,
    titulo: "Apresentação SeuAgente.ai",
    descricao: "PDF da apresentação oficial do SeuAgente.ai para clientes.",
    tipo: "PDF",
    icon: Presentation,
    downloadUrl: "#",
    previewUrl: null
  },
  {
    id: 2,
    titulo: "Guia de Abordagem de Vendas",
    descricao: "Manual completo com técnicas de vendas e scripts de abordagem.",
    tipo: "PDF", 
    icon: FileText,
    downloadUrl: "#",
    previewUrl: null
  },
  {
    id: 3,
    titulo: "Casos de Sucesso - Barbearias",
    descricao: "Exemplos reais de sucesso com clientes do segmento de barbearias.",
    tipo: "PDF",
    icon: FileText,
    downloadUrl: "#",
    previewUrl: null
  },
  {
    id: 4,
    titulo: "Vídeo Demonstrativo",
    descricao: "Demonstração completa da plataforma SeuAgente.ai em funcionamento.",
    tipo: "Video",
    icon: Video,
    downloadUrl: "#",
    previewUrl: "https://example.com/video"
  },
  {
    id: 5,
    titulo: "Kit de Imagens para Redes Sociais",
    descricao: "Pacote com imagens otimizadas para Instagram, Facebook e LinkedIn.",
    tipo: "ZIP",
    icon: FileText,
    downloadUrl: "#",
    previewUrl: null
  },
  {
    id: 6,
    titulo: "Scripts de WhatsApp",
    descricao: "Modelos de mensagens para abordar prospects via WhatsApp.",
    tipo: "PDF",
    icon: FileText,
    downloadUrl: "#",
    previewUrl: null
  }
];

export default function Materiais() {
  const { toast } = useToast();

  const handleDownload = (material: any) => {
    toast({
      title: "Download iniciado!",
      description: `Baixando ${material.titulo}...`,
    });
  };

  const handlePreview = (material: any) => {
    if (material.previewUrl) {
      window.open(material.previewUrl, "_blank");
    } else {
      toast({
        title: "Preview não disponível",
        description: "Este material não possui preview online.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Materiais de Apoio</h1>
        <p className="text-muted-foreground">Recursos para impulsionar suas vendas</p>
      </div>

      {mockMateriais.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMateriais.map((material) => {
            const IconComponent = material.icon;
            return (
              <Card key={material.id} className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{material.titulo}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">{material.tipo}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{material.descricao}</p>
                  
                  <div className="flex flex-col space-y-2">
                    <Button 
                      onClick={() => handleDownload(material)}
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar
                    </Button>
                    
                    {material.previewUrl && (
                      <Button 
                        onClick={() => handlePreview(material)}
                        variant="outline"
                        className="w-full"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum material de apoio disponível no momento.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}