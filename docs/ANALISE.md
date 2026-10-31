# Formare — análise do app (v0.4)

Leitura crítica do que existe hoje, para decidir as próximas versões. Ordem: o que mais pesa na sensação de argila vem primeiro.

## 1. Motor de pincéis

### O que já funciona bem
- **Argila por plano**: o pincel Argila empilha material até um plano acima da superfície, com pelotas irregulares (ruído por traço). É o que dá o aspecto de barro acumulado, não de "inflar".
- **Conservação de volume**: Polegar, Laço e Beliscar devolvem o material deslocado num anel ao redor (no Polegar, mais à frente do gesto). É raro em apps de escultura e é a base da sensação.
- **Estado da argila**: úmida, couro e seca mudam o shader e o comportamento (seca esfarela no Laço e na Esteca, alisa menos).
- **Cavidade por vértice**: alimenta o sombreado, a pátina do bronze e a lavagem da pintura.

### Limitações que o usuário vai sentir
| # | Limitação | Efeito | Solução proposta |
|---|---|---|---|
| 1 | **Topologia fixa** depois da conversão (65 a 160 mil vértices) | Puxar estica triângulos; detalhe fino (dobras, pálpebras) não cabe | **Remesh por voxel** dentro da Escultura (botão "Reamassar") e depois **topologia dinâmica** local (subdivide onde o pincel passa) |
| 2 | Busca de vértices **força bruta** a cada toque | Acima de ~200 mil vértices o traço engasga | Grade espacial de vértices, pincéis num Web Worker, e no app nativo C++/Rust |
| 3 | **Alisar é Laplaciano simples** | Encolhe a peça ao alisar muito | Alisamento de Taubin (λ/μ) ou HC, que preserva volume |
| 4 | Conservação conta **vértices**, não área | Em malha irregular a borda sobe demais ou de menos | Pesar pelo área de cada vértice (área de Voronoi) |
| 5 | **Curva de queda fixa** | Todos os pincéis têm a mesma "borda" | Editor de curva por pincel + presets (macio, duro, platô) |
| 6 | **Inclinação da caneta ignorada** | A caneta não age como ferramenta física | Usar `tiltX/tiltY`: orientação da Esteca e do Laço segue o ângulo da caneta, como segurar uma esteca real |
| 7 | Simetria aplica um **segundo toque espelhado** | Na linha do meio o efeito dobra | Mapa de vértices espelhados + aplicação única |
| 8 | Estabilizador é só suavização | Linhas longas e retas são difíceis | "Corda" (Lazy Mouse): o pincel só anda quando a corda estica |
| 9 | Massa em grade de 112³ | Pelotas pequenas perdem forma | Grade esparsa e adaptativa (estilo OpenVDB), mais resolução só onde há argila |

### Pincéis novos que reforçam o "ateliê"
- **Barbotina** (argila líquida): preenche rachaduras e funde emendas entre pelotas.
- **Fio de corte**: arraste uma linha e o fio fatia a peça num plano, como o arame de cortar barro.
- **Rolo**: achata ao longo de um cilindro (placas, panos, costas de busto).
- **Estica / Gancho**: puxa pontas (orelhas, chifres, dedos) sem esticar a base.
- **Vinco**: sulco com borda levantada, para dobras de pele e roupa.
- **Carimbos de textura**: polpa do dedo, tecido, couro, esponja e escova, com alfas pintados em argila real.
- **Lixa**: só funciona na argila seca, tira saliências e deixa pó fino.
- **Pente fino**: sulcos bem finos e paralelos, para cabelo.

## 2. Interface e estética

### Pontos fortes
- Linguagem de ateliê coerente: madeira, terracota, tipografia serifada no nome, ilhas flutuantes.
- Etapas numeradas deixam o processo claro, e cada etapa mostra só o que importa.
- Menu radial no Espaço e atalhos espelhados de ferramentas profissionais (Shift alisa, Alt inverte).

### O que melhorar
1. **Barra superior aperta abaixo de 1360 px**: as etapas descem para uma segunda linha. Proposta: uma barra única, com as etapas no centro em ícones + nome só da etapa atual.
2. **Painel lateral comprido**: em Render ele rola bastante. Proposta: abas dentro do painel (Luzes · Material · Saída) e mover "Vista" para botões flutuantes perto da peça.
3. **Texto de ajuda sobre a peça**: atrapalha a vista. Proposta: um tutorial curto na primeira abertura, depois some.
4. **Cursor do pincel**: só o anel. Proposta: mostrar a curva de queda (anel interno), a direção do gesto para Esteca e Polegar, e o raio de conservação.
5. **Ícones** foram desenhados à mão e variam de peso. Proposta: um conjunto único, desenhado para o Formare.
6. **Ícone do app** é provisório.
7. **Celular**: funciona, mas fica apertado. Proposta: layout próprio para tablet, com ferramentas no polegar esquerdo.
8. **Acessibilidade**: contraste dos textos secundários está no limite em fundo escuro; vale subir um tom.

## 3. Render e pintura

- Sombra só da luz principal. Próximo: sombra das demais luzes e **oclusão ambiente em tela** (SSAO) para dar peso às cavidades no render.
- Profundidade de campo (foco) com a lente.
- Materiais extras: cerâmica esmaltada (brilho vítreo que escorre), gesso patinado, pedra-sabão.
- Pintura: camadas (engobe por baixo, pátina por cima) e esgrafito (riscar a camada de cima e revelar a de baixo).

## 4. Prioridades sugeridas

1. Reamassar (remesh por voxel) e alisamento que preserva volume.
2. Inclinação da caneta e carimbos de textura.
3. Barbotina, Fio de corte, Estica.
4. Reorganizar a barra superior e o painel lateral.
5. Desempenho: pincéis em Worker, depois o núcleo nativo.
