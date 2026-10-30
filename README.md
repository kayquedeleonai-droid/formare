# Ateliê de Argila

Aplicativo de escultura 3D com foco em **sensação real de argila**. Bebe da fonte do ZBrush, Nomad e Sculpty, com UI e UX modernas e pensado desde o início para caneta e toque.

Alvo: Windows primeiro, depois iPad/iOS e Android.

## Tese do produto

A "sensação de argila" é a soma de quatro camadas:

1. **Material**: shader com espalhamento suave da luz, grão procedural que não estica, cavidades escurecidas e estados da argila (úmida, couro, seca).
2. **Comportamento do pincel**: conservação de volume, acúmulo de pelotas, ferramentas físicas reais (polegar, esteca dentada, laço, espátula).
3. **Feedback sensorial**: pressão e inclinação da caneta, háptica e som de atrito.
4. **Ateliê**: banqueta giratória com inércia, armação, luz de estúdio e interface que some.

## Versão atual: v0.2 (navegador)

`index.html` roda direto no navegador e serve para validar a sensação antes do motor nativo.

**Escultura**
- Malha densa (icosfera nível 7, ~164 mil vértices) com raycast em grade espacial
- 10 ferramentas em 4 grupos: Modelar (Argila, Polegar, Puxar, Inflar), Acabar (Alisar, Espátula), Detalhar (Esteca dentada, Laço, Beliscar), Proteger (Máscara)
- Conservação de volume: o material empurrado sobe nas bordas
- Estado da argila (úmida → couro → seca) muda o shader e o comportamento dos pincéis
- Máscara com Ctrl, inverter e limpar
- Pressão da caneta, estabilizador, simetria X, cada ferramenta lembra seu tamanho e força

**Fluxo de trabalho**
- Biblioteca de peças com miniaturas, salvamento automático a cada gesto (IndexedDB), duplicar e excluir
- Peças novas a partir de Cabeça base, Esfera, Bloco, Rolo ou Exemplo
- Desfazer/refazer leve (guarda só os vértices tocados, até 80 passos)
- Exportar: projeto (.zip, reabre depois), OBJ, STL em milímetros (100 mm de altura) e PNG em 2×
- Menu radial no Espaço, presets de luz (Ateliê, Janela, Dramática, Neutra), vistas Frente/Lado/Topo/Ajustar
- Som de atrito que reage à velocidade, pressão, ferramenta e estado da argila

Atalhos: `1–0` ferramentas · `Espaço` menu radial · `Shift` alisar · `Alt` inverter · `Ctrl` máscara · `[ ]` tamanho · `X` simetria · `F` enquadrar · `Ctrl+Z` desfazer · `Ctrl+S` salvar · `?` atalhos.

## Roadmap

- [ ] Testes de sensação com escultores (caneta Wacom, Apple Pencil)
- [ ] Topologia dinâmica e remesh por voxel (resolução onde precisa)
- [ ] Camadas de escultura e multirresolução
- [ ] Pincéis com alfas de textura (dedos, tecido, esponja) e curva de queda editável
- [ ] Sincronização das peças na nuvem
- [ ] Núcleo nativo em C++/Rust com Vulkan / DirectX 12 / Metal
- [ ] MVP Windows com suporte a tablet
- [ ] iPad com háptica do Apple Pencil Pro
- [ ] Android
