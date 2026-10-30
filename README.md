# Ateliê de Argila

Aplicativo de escultura 3D com foco em **sensação real de argila**. Bebe da fonte do ZBrush, Nomad e Sculpty, com UI e UX modernas e pensado desde o início para caneta e toque.

Alvo: Windows primeiro, depois iPad/iOS e Android.

## Tese do produto

A "sensação de argila" é a soma de quatro camadas:

1. **Material**: shader com espalhamento suave da luz, grão procedural que não estica, cavidades escurecidas e estados da argila (úmida, couro, seca).
2. **Comportamento do pincel**: conservação de volume, acúmulo de pelotas, ferramentas físicas reais (polegar, esteca dentada, laço, espátula).
3. **Feedback sensorial**: pressão e inclinação da caneta, háptica e som de atrito.
4. **Ateliê**: banqueta giratória com inércia, armação, luz de estúdio e interface que some.

## Versão atual: v0.3 (navegador)

O app segue o processo tradicional do escultor, em três etapas:

**1 · Armação** — modelos de arame (Figura humana, Animal, Busto, Livre) presos numa haste sobre a base. Ferramentas: Mover (posar), Estender (puxar arame novo), Conectar, Apagar. Simetria X.

**2 · Massa** — a argila vira um volume (campo de distância 112³) e as peças se fundem com emendas visíveis:
Pelota, Rolinho, Placa, Bloco, Cilindro e Arrancar, com tamanho e irregularidade. "Cobrir o arame" faz a primeira camada.

**3 · Escultura** — a massa é convertida (Surface Nets 2×, relaxamento tangencial) numa malha densa de topologia livre, e entram os 10 pincéis: Argila, Polegar, Puxar, Inflar, Alisar, Espátula, Esteca dentada, Laço, Beliscar, Máscara. Conservação de volume, estado úmido/couro/seco, pressão da caneta, estabilizador.

**Fluxo de trabalho** — biblioteca com salvamento automático (IndexedDB), desfazer por etapa, exportar projeto (.zip com armação, massa e escultura), OBJ, STL em mm e PNG. Menu radial (Espaço), Tab troca de etapa, presets de luz e vistas.

## Roadmap

**Próximo (v0.4)**
- [ ] Estúdio de render: pontos de luz posicionáveis, sombras suaves, oclusão ambiente, fundos e lentes, exportação em alta resolução
- [ ] Pintura sobre a argila: engobes, óxidos, pátinas (bronze, ferro, gesso), lavagem que escorre para as cavidades
- [ ] Massa que acompanha o arame ao reposar (vínculo das peças ao segmento mais próximo)

**Depois**
- [ ] Remesh por voxel dentro da escultura (resolução onde precisa)
- [ ] Camadas de escultura e multirresolução
- [ ] Pincéis com alfas de contato (polpa do dedo, tecido, esponja)
- [ ] Sincronização na nuvem
- [ ] Núcleo nativo C++/Rust com Vulkan / DirectX 12 / Metal, MVP Windows, depois iPad (háptica do Apple Pencil Pro) e Android
