# Formare

Escultura digital com **sensação de argila real**. Inspirado no ZBrush, Nomad e Sculpty, com interface moderna e pensado para caneta e toque.

Plataformas: Windows (instalável, com atualização automática) e navegador. iPad e Android depois.

## O processo, como no ateliê

1. **Armação** *(opcional)*: arame de Figura humana, Animal, Busto ou Livre, preso numa haste. Mover, Estender, Conectar, Apagar.
2. **Massa**: Pelota, Rolinho, Placa, Bloco, Cilindro e Arrancar. As peças se fundem com emendas visíveis. Pode começar sem arame.
3. **Escultura**: 10 pincéis (Argila, Polegar, Puxar, Inflar, Alisar, Espátula, Esteca dentada, Laço, Beliscar, Máscara), com conservação de volume e argila úmida/couro/seca.
4. **Pintura**: engobes e óxidos, Lavagem que escorre para as cavidades, Polir que revela os relevos. Acabamentos: Argila crua, Terracota, Gesso, Bronze patinado, Mármore.
5. **Render**: até 4 luzes posicionadas na cena, sombra suave, fundos de estúdio, lente, formatos (4:5, 1:1, 16:9) e exportação até 4K. Vídeo de giro 360°.

Peça nova começa direto numa bola de argila; a armação é um recurso a mais.

Salvamento automático a cada gesto. Exporta projeto (.zip), OBJ com cores, STL em milímetros, PNG e vídeo.

## Estrutura

```
app/            O app (uma página HTML + three.js de reserva para uso offline)
electron/       Casca do Windows: janela, salvar arquivos, atualização automática
build/          Ícone
.github/        Gera o instalador e publica a versão a cada mudança na main
docs/           Análise e decisões
```

## Desenvolver

```bash
npm install
npm start          # abre o Formare no desktop
npm run dist       # gera o instalador em dist/ (no Windows)
```

## Atualização automática

1. Cada mudança em `app/`, `electron/` ou `build/` enviada para `main` dispara o workflow **Publicar versão para Windows**.
2. Ele gera `Formare-Setup-0.4.N.exe` e publica um Release no GitHub.
3. O Formare instalado procura novas versões ao abrir e a cada 2 horas, baixa em segundo plano e pergunta se quer reiniciar. Se não reiniciar, instala ao fechar.

O instalador ainda não é assinado digitalmente, então o Windows pode mostrar o aviso do SmartScreen na primeira instalação ("Mais informações" → "Executar assim mesmo").

## Roadmap

Ver [docs/ANALISE.md](docs/ANALISE.md). Próximos passos: Reamassar (remesh por voxel), alisamento que preserva volume, inclinação da caneta, carimbos de textura, pincéis Barbotina, Fio de corte e Estica.
