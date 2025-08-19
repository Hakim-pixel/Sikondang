"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

/*
  We dynamically import the CytoscapeComponent to avoid SSR issues.
  react-cytoscapejs exports a CytoscapeComponent default, but since
  some setups can be different, we directly require it at runtime.
*/
const CytoscapeComponent = dynamic(
  async () => {
    const mod = await import("react-cytoscapejs");
    return mod.default;
  },
  { ssr: false }
);

export default function BappendaNetwork() {
  const cyRef = useRef(null);
  const [search, setSearch] = useState("");
  const [layoutName, setLayoutName] = useState("breadthfirst");

  // Contoh data node & edge — ubah sesuai struktur nyata Bappenda
  const elements = useMemo(
    () => [
      // nodes
      { data: { id: "Kepala", label: "Kepala Bappenda" } },
      { data: { id: "Sekretariat", label: "Sekretariat" } },
      { data: { id: "BidangPendapatan", label: "Bidang Pendapatan" } },
      { data: { id: "BidangPenetapan", label: "Bidang Penetapan" } },
      { data: { id: "BidangPenagihan", label: "Bidang Penagihan" } },
      { data: { id: "SubKepegawaian", label: "Sub. Kepegawaian" } },
      { data: { id: "SubUmum", label: "Sub. Umum & Keuangan" } },
      { data: { id: "IT", label: "Seksi IT & Data" } },
      { data: { id: "Kerjasama", label: "Seksi Kerjasama" } },

      // edges (hirarki / koordinasi)
      { data: { id: "e1", source: "Kepala", target: "Sekretariat" } },
      { data: { id: "e2", source: "Kepala", target: "BidangPendapatan" } },
      { data: { id: "e3", source: "Kepala", target: "BidangPenetapan" } },
      { data: { id: "e4", source: "Kepala", target: "BidangPenagihan" } },
      { data: { id: "e5", source: "Sekretariat", target: "SubKepegawaian" } },
      { data: { id: "e6", source: "Sekretariat", target: "SubUmum" } },
      { data: { id: "e7", source: "BidangPendapatan", target: "IT" } },
      { data: { id: "e8", source: "BidangPendapatan", target: "Kerjasama" } },

      // contoh relasi kolaborasi non-hirarki
      { data: { id: "c1", source: "IT", target: "SubUmum", relation: "kolab" } },
      { data: { id: "c2", source: "Kerjasama", target: "BidangPenagihan", relation: "kolab" } },
    ],
    []
  );

  // style Cytoscape
  const stylesheet = [
    {
      selector: "node",
      style: {
        label: "data(label)",
        "text-valign": "center",
        "text-halign": "center",
        "background-color": "#FDE68A", // soft yellow
        width: "label",
        height: "label",
        padding: "12px",
        "font-size": 12,
        "text-wrap": "wrap",
        "border-width": 1,
        "border-color": "#c08400",
        "shape": "round-rectangle",
      },
    },
    {
      selector: 'node[id = "Kepala"]',
      style: {
        "background-color": "#60A5FA",
        "text-valign": "center",
        "color": "#fff",
        "font-weight": "700",
        "border-color": "#2563EB",
      },
    },
    {
      selector: 'edge[relation = "kolab"]',
      style: {
        "line-style": "dashed",
        "target-arrow-shape": "triangle",
        "target-arrow-color": "#9CA3AF",
        "line-color": "#9CA3AF",
        "curve-style": "bezier",
      },
    },
    {
      selector: "edge",
      style: {
        width: 2,
        "line-color": "#D1D5DB",
        "target-arrow-shape": "triangle",
        "target-arrow-color": "#D1D5DB",
        "curve-style": "bezier",
      },
    },
    {
      selector: ".highlight",
      style: {
        "background-color": "#34D399",
        "border-color": "#059669",
        "transition-property": "background-color, border-color",
        "transition-duration": "200ms",
      },
    },
  ];

  // helpers: highlight node by id
  function focusNode(id) {
    const cy = cyRef.current;
    if (!cy) return;
    cy.elements().removeClass("faded");
    cy.elements().removeClass("highlight");
    const node = cy.getElementById(id);
    if (node) {
      cy.elements().addClass("faded"); // fade others
      node.removeClass("faded");
      node.addClass("highlight");
      node.connectedEdges().removeClass("faded");
      node.connectedEdges().addClass("highlight");
      // center on node
      cy.animate({
        center: { eles: node },
        duration: 400,
      });
    }
  }

  // search & focus
  function onSearch() {
    if (!search) {
      const cy = cyRef.current;
      cy.elements().removeClass("faded");
      cy.elements().removeClass("highlight");
      return;
    }
    const cy = cyRef.current;
    const found = cy.nodes().filter((n) =>
      n.data("label").toLowerCase().includes(search.toLowerCase())
    );
    if (found.length > 0) {
      cy.elements().addClass("faded");
      found.forEach((n) => {
        n.removeClass("faded");
        n.addClass("highlight");
      });
      // fit to found nodes
      cy.fit(found, 40);
    } else {
      cy.elements().removeClass("faded");
      cy.elements().removeClass("highlight");
    }
  }

  // export PNG
  function exportPNG() {
    const cy = cyRef.current;
    if (!cy) return;
    const png = cy.png({ full: true, scale: 2 });
    const a = document.createElement("a");
    a.href = png;
    a.download = "bappenda-network.png";
    a.click();
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Simpul Jaringan Organisasi — Bappenda</h1>

      <div className="mb-4 flex flex-col md:flex-row gap-3 items-start">
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari node (mis. 'IT' atau 'Kepala')"
            className="border rounded px-3 py-2 focus:outline-none"
          />
          <button
            onClick={onSearch}
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            Cari & Fokus
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Layout:</label>
          <select
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="breadthfirst">Breadthfirst (hirarki)</option>
            <option value="grid">Grid</option>
            <option value="circle">Circle</option>
            <option value="random">Random</option>
          </select>
        </div>

        <div className="ml-auto flex gap-2">
          <button
            onClick={() => {
              // reset view
              const cy = cyRef.current;
              if (cy) {
                cy.fit(50);
                cy.elements().removeClass("faded");
                cy.elements().removeClass("highlight");
              }
            }}
            className="border px-3 py-2 rounded"
          >
            Reset
          </button>
          <button onClick={exportPNG} className="bg-green-600 text-white px-3 py-2 rounded">
            Export PNG
          </button>
        </div>
      </div>

      <div style={{ height: "640px", border: "1px solid #e5e7eb" }}>
        <CytoscapeComponent
          elements={elements}
          stylesheet={stylesheet}
          style={{ width: "100%", height: "100%" }}
          layout={{ name: layoutName, padding: 30, spacingFactor: 1.2 }}
          cy={(cy) => {
            // keep reference
            cyRef.current = cy;

            // basic interactions
            cy.on("tap", "node", (evt) => {
              const node = evt.target;
              // highlight clicked node
              cy.elements().removeClass("faded");
              cy.elements().removeClass("highlight");
              node.addClass("highlight");
              node.connectedEdges().addClass("highlight");
              node.connectedEdges().removeClass("faded");
              // center
              cy.animate({ center: { eles: node }, duration: 300 });
            });

            // show tooltip on hover (simple)
            cy.on("mouseover", "node", (e) => {
              const n = e.target;
              n.qtip && n.qtip("api") && n.qtip("api").destroy && n.qtip("api").destroy();
              // simple title attribute fallback (browser tooltip)
              n.tippy && n.tippy.show && n.tippy.show();
            });

            // enable panning / zooming
            cy.userZoomingEnabled(true);
            cy.userPanningEnabled(true);
          }}
        />
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Tip: klik node untuk menyorot (highlight). Gunakan tombol <strong>Export PNG</strong> untuk menyimpan gambar.
      </div>
    </div>
  );
}
