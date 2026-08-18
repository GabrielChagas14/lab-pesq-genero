/**
 * src/plugins/echarts.js
 *
 * Configuração centralizada do ECharts com tree-shaking.
 * Registra aqui apenas os componentes compartilhados (renderer + componentes de
 * layout/interação comuns). Tipos de gráficos específicos (BarChart, LineChart,
 * MapChart, etc.) devem ser registrados via `use()` diretamente nas páginas que
 * os utilizarem.
 *
 * Uso nas páginas:
 *   import { use }      from "echarts/core";
 *   import { BarChart } from "echarts/charts";
 *   use([BarChart]);
 */

import { use } from "echarts/core";

// ── Renderer ──────────────────────────────────────────────────────────────────
// CanvasRenderer é o padrão. Substitua por SVGRenderer se precisar de SVG.
import { CanvasRenderer } from "echarts/renderers";

// ── Componentes de layout e interação (comuns a quase todos os gráficos) ──────
import {
    GridComponent,        // eixos cartesianos (x/y)
    TooltipComponent,     // tooltips ao hover
    LegendComponent,      // legenda
    TitleComponent,       // título do gráfico
    DataZoomComponent,    // zoom/pan nos dados
    ToolboxComponent,     // barra de ferramentas (download, reset…)
    VisualMapComponent,   // mapeamento visual de cores
} from "echarts/components";

// ── Registra os componentes base globalmente ───────────────────────────────────
use([
    CanvasRenderer,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    DataZoomComponent,
    ToolboxComponent,
    VisualMapComponent,
]);
