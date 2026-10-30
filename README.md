# Ateliê de Argila

Aplicativo de escultura 3D com foco em **sensação real de argila**. Bebe da fonte do ZBrush, Nomad e Sculpty, com UI e UX modernas e pensado desde o início para caneta e toque.

Alvo: Windows primeiro, depois iPad/iOS e Android.

## Tese do produto

A "sensação de argila" é a soma de quatro camadas:

1. **Material**: shader com espalhamento suave da luz, grão procedural que não estica, cavidades escurecidas e estados da argila (úmida, couro, seca).
2. **Comportamento do pincel**: conservação de volume, acúmulo de pelotas, ferramentas físicas reais (polegar, esteca dentada, laço, espátula).
3. **Feedback sensorial**: pressão e inclinação da caneta, háptica e som de atrito.
4. **Ateliê**: banqueta giratória com inércia, armação, luz de estúdio e interface que some.

## Protótipo v0.1 (navegador)

`index.html` é um protótipo para validar a sensação antes de investir no motor nativo. Abra no navegador (ou sirva a pasta com qualquer servidor estático).

- Malha densa (icosfera nível 7, ~164 mil vértices) com raycast em grade espacial
- 6 ferramentas: Argila, Polegar, Alisar, Esteca dentada, Laço, Espátula
- Conservação de volume: o material empurrado sobe nas bordas
- Estado da argila: úmida → couro → seca muda shader e comportamento
- Som de atrito que reage à velocidade, pressão e ferramenta
- Pressão da caneta, simetria X, desfazer/refazer, banqueta com inércia

Atalhos: `1–6` ferramentas · `[ ]` tamanho · `Shift` alisar · `Alt` inverter · `X` simetria · `Ctrl+Z` desfazer.

## Roadmap

- [ ] Testes de sensação com escultores (caneta Wacom, Apple Pencil)
- [ ] Topologia dinâmica e remesh por voxel
- [ ] Núcleo nativo em C++/Rust com renderização Vulkan / DirectX 12 / Metal
- [ ] MVP Windows com suporte a tablet
- [ ] iPad com háptica do Apple Pencil Pro
- [ ] Android
