import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Download, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import InvoiceTemplate from '../components/InvoiceTemplate';
import { generatePDF } from '../utils/pdfGenerator';
import { templates } from '../utils/templateRegistry';

const TemplatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
      setCurrentTemplate(location.state.selectedTemplate || 1);
    } else {
      const savedFormData = localStorage.getItem('formData');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    }
  }, [location.state]);

  const handleTemplateChange = (templateNumber) => {
    setCurrentTemplate(templateNumber);
  };

  const handleDownloadPDF = async () => {
    if (formData && !isDownloading) {
      setIsDownloading(true);
      try {
        await generatePDF(formData, currentTemplate);
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-36" />
          </div>
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-32 flex-shrink-0" />
            ))}
          </div>
          <div className="flex justify-center">
            <Skeleton className="w-[210mm] h-[297mm]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="group border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
            Back
          </Button>
          <Button 
            onClick={handleDownloadPDF} 
            disabled={isDownloading}
            className="gradient-primary text-primary-foreground shadow-elegant hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>

        {/* Template Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Select Template</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {templates.map((template, index) => {
              const isSelected = currentTemplate === index + 1;
              return (
                <Card
                  key={index}
                  className={`cursor-pointer flex-shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-elegant ${
                    isSelected
                      ? "ring-2 ring-primary shadow-elegant bg-primary/5"
                      : "hover:bg-secondary/50 border-border/50"
                  }`}
                  onClick={() => handleTemplateChange(index + 1)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      isSelected 
                        ? "gradient-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {isSelected ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <span className={`font-medium whitespace-nowrap ${
                      isSelected ? "text-primary" : "text-foreground"
                    }`}>
                      {template.name}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Invoice Preview */}
        <div className="flex justify-center">
          <div className="glass-effect rounded-xl p-6 shadow-card">
            <div className="w-[210mm] h-[297mm] bg-card rounded-lg overflow-hidden shadow-lg">
              <InvoiceTemplate data={formData} templateNumber={currentTemplate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;
