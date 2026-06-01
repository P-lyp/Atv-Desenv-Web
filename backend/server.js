const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('../frontend'));

const produtos = [
  { id: 1, nome: "Epson PowerLite", tipo: "projetor", status: "disponivel", descricao: "Projetor HDMI/VGA" },
  { id: 2, nome: "Dell Inspiron", tipo: "notebook", status: "emprestado", descricao: "Notebook i5 8GB" },
  { id: 3, nome: "Kit Arduino", tipo: "kit", status: "manutencao", descricao: "Kit completo Arduino Uno" },
  { id: 4, nome: "Cabo HDMI 2m", tipo: "cabo", status: "disponivel", descricao: "Cabo HDMI macho/macho" },
  { id: 5, nome: "Logitech C920", tipo: "webcam", status: "emprestado", descricao: "Webcam Full HD" },
  { id: 6, nome: "HyperX QuadCast", tipo: "microfone", status: "disponivel", descricao: "Microfone USB condensador" },
  { id: 7, nome: "BenQ MX528", tipo: "projetor", status: "disponivel", descricao: "Projetor SVGA" },
  { id: 8, nome: "Lenovo ThinkPad", tipo: "notebook", status: "manutencao", descricao: "Notebook i7 16GB" },
  { id: 9, nome: "Kit Raspberry Pi", tipo: "kit", status: "disponivel", descricao: "Kit Raspberry Pi 4" },
  { id: 10, nome: "Cabo VGA 5m", tipo: "cabo", status: "disponivel", descricao: "Cabo VGA macho/macho" }
];

app.get('/produtos', (req, res) => {
  const { status, tipo, busca } = req.query;
  
  let filtrados = produtos;
  
  if (status) {
    filtrados = filtrados.filter(p => p.status === status);
  }
  
  if (tipo) {
    filtrados = filtrados.filter(p => p.tipo === tipo);
  }
  
  if (busca) {
    const termo = busca.toLowerCase();
    filtrados = filtrados.filter(p => p.nome.toLowerCase().includes(termo));
  }
  
  res.json({
    total: filtrados.length,
    produtos: filtrados
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
