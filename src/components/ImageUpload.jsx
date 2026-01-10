import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon, QrCode } from 'lucide-react';

const ImageUpload = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  icon: Icon = ImageIcon,
  accept = "image/*",
  className = ""
}) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border-2 border-primary/30 bg-primary/5">
          <img
            src={value}
            alt={label}
            className="w-full h-32 object-contain p-2"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleClick}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <span className="text-white text-sm font-medium">Change Image</span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="w-full h-32 border-2 border-dashed border-border hover:border-primary/50 rounded-xl flex flex-col items-center justify-center gap-2 bg-muted/30 hover:bg-primary/5 transition-all duration-300 group"
        >
          <div className="p-3 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
            <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            {placeholder || `Upload ${label}`}
          </span>
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
