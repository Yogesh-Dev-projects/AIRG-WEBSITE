import fs from "fs";
import path from "path";

// Bounding box: 76.0 384.8 206.6 493.2
// Width: 130.6, Height: 108.4
// viewBox: "70 380 145 120"

function displace(p1, p2, depth, maxOffset, seed) {
  if (depth === 0) {
    return [p1, p2];
  }

  // Deterministic seed-based random value
  const s = Math.sin(p1.x * 12.9898 + p1.y * 78.233 + p2.x * 37.719 + p2.y * 43.123 + seed) * 43758.5453;
  const rand = s - Math.floor(s);
  const randOffset = (rand - 0.5) * 2 * maxOffset;

  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2;

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 0.5) return [p1, p2];

  const px = -dy / len;
  const py = dx / len;

  const mid = {
    x: midX + px * randOffset,
    y: midY + py * randOffset,
  };

  const left = displace(p1, mid, depth - 1, maxOffset / 1.7, seed + 1);
  const right = displace(mid, p2, depth - 1, maxOffset / 1.7, seed + 2);

  return [...left.slice(0, -1), ...right];
}

function parsePath(pathStr) {
  const points = [];
  const regex = /(\d+\.?\d*),(\d+\.?\d*)/g;
  let m;
  while ((m = regex.exec(pathStr)) !== null) {
    points.push({ x: parseFloat(m[1]), y: parseFloat(m[2]) });
  }
  return points;
}

function formatPoint(p) {
  const x = Math.round(p.x * 10) / 10;
  const y = Math.round(p.y * 10) / 10;
  return `${x},${y}`;
}

try {
  const filePath = path.join(process.cwd(), "src/components/InteractiveIndiaMap.tsx");
  const content = fs.readFileSync(filePath, "utf8");

  // Outer-facing junction points
  const P_Khandala_Wai_outer = { x: 126.4, y: 388.3 };
  const P_Khandala_Phaltan_outer = { x: 154.0, y: 395.5 };
  const P_Phaltan_Man_outer = { x: 190.2, y: 425.0 };
  const P_Man_Khatav_outer = { x: 181.0, y: 460.8 };
  const P_Khatav_Karad_outer = { x: 158.3, y: 463.7 };
  const P_Karad_Patan_outer = { x: 122.1, y: 493.2 };
  const P_Patan_Jaoli_outer = { x: 85.2, y: 432.9 };
  const P_Jaoli_Mahabaleshwar_outer = { x: 80.2, y: 428.5 };
  const P_Wai_Mahabaleshwar_outer = { x: 80.9, y: 405.6 };

  // Internal triple/quadruple junction points
  const P_junc_Wai_Mahabaleshwar_Jaoli = { x: 98, y: 415 };
  const P_junc_Wai_Jaoli_Satara = { x: 115, y: 418 };
  const P_junc_Wai_Khandala_Satara = { x: 132, y: 408 };
  const P_junc_Khandala_Koregaon_Satara = { x: 144, y: 416 };
  const P_junc_Khandala_Phaltan_Koregaon = { x: 154, y: 410 };
  const P_junc_Phaltan_Koregaon_Man = { x: 176, y: 422 };
  const P_junc_Koregaon_Man_Khatav = { x: 172, y: 446 };
  const P_junc_Koregaon_Khatav_Karad = { x: 150, y: 448 };
  const P_junc_Satara_Koregaon_Karad = { x: 142, y: 442 };
  const P_junc_Satara_Karad_Patan = { x: 116, y: 450 };
  const P_junc_Satara_Patan_Jaoli = { x: 112, y: 438 };

  // Edge definitions
  const edges = {};

  const defineEdge = (name, p1, p2, depth, offsetPct, seed) => {
    const len = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    edges[name] = displace(p1, p2, depth, len * offsetPct, seed);
  };

  // Define all 21 edges
  defineEdge("E_Khandala_Wai", P_junc_Wai_Khandala_Satara, P_Khandala_Wai_outer, 3, 0.08, 10);
  defineEdge("E_Wai_Satara", P_junc_Wai_Khandala_Satara, P_junc_Wai_Jaoli_Satara, 3, 0.08, 20);
  defineEdge("E_Wai_Jaoli", P_junc_Wai_Jaoli_Satara, P_junc_Wai_Mahabaleshwar_Jaoli, 3, 0.08, 30);
  defineEdge("E_Wai_Mahabaleshwar", P_junc_Wai_Mahabaleshwar_Jaoli, P_Wai_Mahabaleshwar_outer, 3, 0.08, 40);
  defineEdge("E_Jaoli_Mahabaleshwar", P_junc_Wai_Mahabaleshwar_Jaoli, P_Jaoli_Mahabaleshwar_outer, 3, 0.08, 50);
  defineEdge("E_Jaoli_Patan", P_Patan_Jaoli_outer, P_junc_Satara_Patan_Jaoli, 3, 0.08, 60);
  defineEdge("E_Jaoli_Satara", P_junc_Satara_Patan_Jaoli, P_junc_Wai_Jaoli_Satara, 3, 0.08, 70);
  defineEdge("E_Khandala_Satara", P_junc_Wai_Khandala_Satara, P_junc_Khandala_Koregaon_Satara, 3, 0.08, 80);
  defineEdge("E_Khandala_Koregaon", P_junc_Khandala_Koregaon_Satara, P_junc_Khandala_Phaltan_Koregaon, 3, 0.08, 90);
  defineEdge("E_Khandala_Phaltan", P_Khandala_Phaltan_outer, P_junc_Khandala_Phaltan_Koregaon, 3, 0.08, 100);
  defineEdge("E_Phaltan_Koregaon", P_junc_Khandala_Phaltan_Koregaon, P_junc_Phaltan_Koregaon_Man, 3, 0.08, 110);
  defineEdge("E_Phaltan_Man", P_Phaltan_Man_outer, P_junc_Phaltan_Koregaon_Man, 3, 0.08, 120);
  defineEdge("E_Koregaon_Man", P_junc_Phaltan_Koregaon_Man, P_junc_Koregaon_Man_Khatav, 3, 0.08, 130);
  defineEdge("E_Koregaon_Khatav", P_junc_Koregaon_Man_Khatav, P_junc_Koregaon_Khatav_Karad, 3, 0.08, 140);
  defineEdge("E_Koregaon_Karad", P_junc_Koregaon_Khatav_Karad, P_junc_Satara_Koregaon_Karad, 3, 0.08, 150);
  defineEdge("E_Satara_Koregaon", P_junc_Khandala_Koregaon_Satara, P_junc_Satara_Koregaon_Karad, 3, 0.08, 160);
  defineEdge("E_Satara_Karad", P_junc_Satara_Koregaon_Karad, P_junc_Satara_Karad_Patan, 3, 0.08, 170);
  defineEdge("E_Satara_Patan", P_junc_Satara_Karad_Patan, P_junc_Satara_Patan_Jaoli, 3, 0.08, 180);
  defineEdge("E_Man_Khatav", P_junc_Koregaon_Man_Khatav, P_Man_Khatav_outer, 3, 0.08, 190);
  defineEdge("E_Khatav_Karad", P_junc_Koregaon_Khatav_Karad, P_Khatav_Karad_outer, 3, 0.08, 200);
  defineEdge("E_Karad_Patan", P_junc_Satara_Karad_Patan, P_Karad_Patan_outer, 3, 0.08, 210);

  const getEdge = (name, isForward) => {
    const edge = edges[name];
    if (!edge) throw new Error("Edge not found: " + name);
    return isForward ? [...edge] : [...edge].reverse();
  };

  // Outer parts of the tehsils
  const outer_khandala = "M 126.4,388.3 L 127.1,389.1 L 127.8,389.1 L 128.5,389.8 L 129.9,389.8 L 132.0,391.2 L 133.5,391.2 L 134.2,391.9 L 135.6,391.9 L 136.3,392.7 L 137.7,392.7 L 138.4,393.4 L 141.3,393.4 L 142.0,394.1 L 143.4,394.1 L 144.1,394.8 L 146.2,394.8 L 146.9,395.5 L 154.0,395.5";
  const outer_wai = "M 80.9,405.6 L 81.6,405.6 L 82.3,404.9 L 82.3,404.1 L 85.2,399.8 L 86.6,398.4 L 88.0,398.4 L 88.7,399.1 L 89.4,399.1 L 90.2,398.4 L 90.9,398.4 L 91.6,397.7 L 93.0,397.7 L 94.4,399.1 L 95.1,399.1 L 97.2,401.3 L 98.0,401.3 L 98.7,400.6 L 99.4,399.8 L 99.4,399.1 L 100.1,399.8 L 104.3,399.8 L 105.8,398.4 L 105.8,397.7 L 107.2,396.2 L 107.2,394.1 L 107.9,393.4 L 107.9,391.9 L 110.0,389.8 L 110.0,388.3 L 110.7,387.6 L 110.7,384.8 L 113.6,384.8 L 114.3,385.5 L 116.4,385.5 L 117.1,386.2 L 118.5,386.2 L 119.3,386.9 L 122.8,386.9 L 124.9,388.3 L 126.4,388.3";
  const outer_phaltan = "M 154.0,395.5 L 154.7,396.2 L 156.2,396.2 L 156.9,397.0 L 157.6,397.0 L 158.3,397.7 L 159.0,397.7 L 159.7,398.4 L 161.1,398.4 L 161.8,399.1 L 168.2,399.1 L 168.9,399.8 L 173.2,399.8 L 173.9,400.6 L 174.6,399.8 L 186.0,399.8 L 184.6,401.3 L 184.6,402.0 L 183.9,402.7 L 183.9,404.1 L 183.1,404.9 L 183.1,405.6 L 182.4,406.3 L 181.7,406.3 L 180.3,407.7 L 179.6,407.7 L 178.2,409.2 L 178.2,411.3 L 178.9,412.0 L 178.9,412.8 L 178.2,413.5 L 178.2,414.2 L 177.5,414.9 L 177.5,415.6 L 176.8,416.3 L 176.8,418.5 L 178.9,420.7 L 180.3,420.7 L 181.0,419.9 L 181.7,419.9 L 182.4,419.2 L 183.9,419.2 L 184.6,419.9 L 184.6,420.7 L 185.3,421.4 L 185.3,422.1 L 187.4,424.2 L 188.1,424.2 L 188.8,425.0 L 190.2,425.0";
  const outer_mahabaleshwar = "M 80.2,428.5 L 79.5,428.5 L 78.8,427.8 L 78.1,427.8 L 77.4,427.1 L 76.0,427.1 L 76.0,425.0 L 76.7,424.2 L 76.7,423.5 L 77.4,422.8 L 77.4,422.1 L 78.1,421.4 L 78.1,416.3 L 77.4,415.6 L 77.4,414.9 L 76.7,414.2 L 76.7,413.5 L 76.0,412.8 L 76.7,412.0 L 76.7,409.9 L 77.4,409.2 L 77.4,408.4 L 78.1,408.4 L 80.9,405.6";
  const outer_jaoli = "M 80.2,428.5 L 84.5,432.9 L 85.2,432.9";
  const outer_man = "M 190.2,425.0 L 190.2,426.4 L 191.7,427.8 L 193.8,427.8 L 194.5,427.1 L 196.6,427.1 L 196.6,427.8 L 198.8,430.0 L 202.3,430.0 L 203.0,430.7 L 203.7,430.7 L 203.7,432.1 L 203.0,432.9 L 203.0,433.6 L 204.4,435.0 L 204.4,435.7 L 205.1,436.4 L 205.1,439.3 L 206.6,440.7 L 204.4,442.9 L 204.4,443.6 L 203.7,444.3 L 203.7,445.8 L 203.0,446.5 L 203.0,448.6 L 202.3,449.4 L 202.3,451.5 L 201.6,452.2 L 201.6,453.0 L 199.5,454.4 L 194.5,454.4 L 193.8,453.7 L 192.4,453.7 L 190.9,452.2 L 189.5,452.2 L 188.8,451.5 L 187.4,451.5 L 184.6,454.4 L 184.6,455.8 L 185.3,456.5 L 185.3,458.0 L 186.0,458.7 L 184.6,460.8 L 181.0,460.8";
  const outer_khatav = "M 181.0,460.8 L 180.3,460.1 L 179.6,460.1 L 177.5,458.0 L 176.8,458.0 L 176.0,457.3 L 175.3,457.3 L 172.5,460.1 L 172.5,460.8 L 171.8,461.6 L 171.1,461.6 L 170.4,462.3 L 166.8,462.3 L 166.1,463.0 L 162.6,463.0 L 161.8,463.7 L 158.3,463.7";
  const outer_karad = "M 158.3,463.7 L 156.2,462.3 L 154.7,462.3 L 153.3,460.8 L 151.9,460.8 L 151.2,460.1 L 149.1,460.1 L 148.4,459.4 L 145.5,459.4 L 144.8,460.1 L 144.1,460.1 L 142.0,462.3 L 142.0,464.4 L 144.1,466.6 L 144.8,466.6 L 146.2,468.0 L 146.2,468.7 L 145.5,469.5 L 145.5,470.2 L 144.1,471.6 L 144.1,472.3 L 143.4,473.1 L 143.4,474.5 L 142.7,475.2 L 142.7,475.9 L 143.4,476.6 L 143.4,481.7 L 142.0,483.8 L 142.0,484.5 L 141.3,485.3 L 141.3,486.0 L 139.8,487.4 L 139.8,488.1 L 139.1,488.1 L 138.4,488.8 L 135.6,488.8 L 134.9,489.6 L 134.2,488.8 L 130.6,488.8 L 129.2,490.3 L 128.5,490.3 L 126.4,492.4 L 125.6,492.4 L 124.9,493.2 L 122.1,493.2";
  const outer_patan = "M 122.1,493.2 L 121.4,492.4 L 120.7,492.4 L 119.3,491.0 L 118.5,491.0 L 116.4,489.6 L 115.7,489.6 L 115.0,488.8 L 113.6,488.8 L 112.9,488.1 L 112.2,488.1 L 110.0,486.0 L 108.6,486.0 L 100.8,478.1 L 99.4,478.1 L 98.7,477.4 L 96.5,477.4 L 95.8,476.6 L 95.8,473.8 L 94.4,472.3 L 92.3,472.3 L 89.4,475.2 L 89.4,475.9 L 87.3,475.9 L 87.3,475.2 L 86.6,474.5 L 86.6,471.6 L 85.9,470.9 L 85.9,463.7 L 88.7,463.7 L 92.3,460.1 L 92.3,457.3 L 91.6,456.5 L 91.6,455.8 L 90.9,455.1 L 90.9,454.4 L 90.2,453.7 L 90.2,453.0 L 89.4,452.2 L 89.4,450.8 L 90.9,449.4 L 90.9,448.6 L 91.6,447.9 L 91.6,445.8 L 90.9,445.1 L 90.9,444.3 L 90.2,443.6 L 90.2,442.9 L 88.7,441.5 L 88.7,437.9 L 88.0,437.2 L 88.0,435.7 L 85.2,432.9";

  // Helper to merge consecutive point lists, deduplicating the connecting point
  const mergePoints = (...lists) => {
    const result = [];
    for (const list of lists) {
      if (list.length === 0) continue;
      if (result.length === 0) {
        result.push(...list);
      } else {
        // Check if last point of result matches first point of list
        const last = result[result.length - 1];
        const first = list[0];
        if (Math.abs(last.x - first.x) < 0.1 && Math.abs(last.y - first.y) < 0.1) {
          result.push(...list.slice(1));
        } else {
          result.push(...list);
        }
      }
    }
    return result;
  };

  const makePath = (points) => {
    return "M " + points.map(formatPoint).join(" L ") + " Z";
  };

  // Reconstruct each tehsil
  const regions = {};

  regions["satara-khandala"] = makePath(mergePoints(
    parsePath(outer_khandala),
    getEdge("E_Khandala_Phaltan", true),
    getEdge("E_Khandala_Koregaon", false), // corrected direction
    getEdge("E_Khandala_Satara", false), // corrected direction
    getEdge("E_Khandala_Wai", true)
  ));

  regions["satara-wai"] = makePath(mergePoints(
    parsePath(outer_wai),
    getEdge("E_Khandala_Wai", false),
    getEdge("E_Wai_Satara", true),
    getEdge("E_Wai_Jaoli", true),
    getEdge("E_Wai_Mahabaleshwar", true)
  ));

  regions["satara-phaltan"] = makePath(mergePoints(
    parsePath(outer_phaltan),
    getEdge("E_Phaltan_Man", true),
    getEdge("E_Phaltan_Koregaon", false),
    getEdge("E_Khandala_Phaltan", false)
  ));

  regions["satara-mahabaleshwar"] = makePath(mergePoints(
    parsePath(outer_mahabaleshwar),
    getEdge("E_Wai_Mahabaleshwar", false),
    getEdge("E_Jaoli_Mahabaleshwar", true) // corrected direction
  ));

  regions["satara-jaoli"] = makePath(mergePoints(
    parsePath(outer_jaoli),
    getEdge("E_Jaoli_Patan", true),
    getEdge("E_Jaoli_Satara", true),
    getEdge("E_Wai_Jaoli", true),
    getEdge("E_Jaoli_Mahabaleshwar", true)
  ));

  regions["satara-satara"] = makePath(mergePoints(
    getEdge("E_Khandala_Satara", true),
    getEdge("E_Satara_Koregaon", true),
    getEdge("E_Satara_Karad", true),
    getEdge("E_Satara_Patan", true),
    getEdge("E_Jaoli_Satara", true),
    getEdge("E_Wai_Satara", false)
  ));

  regions["satara-koregaon"] = makePath(mergePoints(
    getEdge("E_Phaltan_Koregaon", true),
    getEdge("E_Koregaon_Man", true),
    getEdge("E_Koregaon_Khatav", true),
    getEdge("E_Koregaon_Karad", true),
    getEdge("E_Satara_Koregaon", false),
    getEdge("E_Khandala_Koregaon", true) // corrected direction
  ));

  regions["satara-man"] = makePath(mergePoints(
    parsePath(outer_man),
    getEdge("E_Man_Khatav", false),
    getEdge("E_Koregaon_Man", false),
    getEdge("E_Phaltan_Man", false)
  ));

  regions["satara-khatav"] = makePath(mergePoints(
    parsePath(outer_khatav),
    getEdge("E_Khatav_Karad", false),
    getEdge("E_Koregaon_Khatav", false),
    getEdge("E_Man_Khatav", true)
  ));

  regions["satara-karad"] = makePath(mergePoints(
    parsePath(outer_karad),
    getEdge("E_Karad_Patan", false),
    getEdge("E_Satara_Karad", false),
    getEdge("E_Koregaon_Karad", false),
    getEdge("E_Khatav_Karad", true)
  ));

  regions["satara-patan"] = makePath(mergePoints(
    parsePath(outer_patan),
    getEdge("E_Jaoli_Patan", true), // corrected direction
    getEdge("E_Satara_Patan", false),
    getEdge("E_Karad_Patan", true)
  ));

  // Overwrite InteractiveIndiaMap.tsx
  let newContent = content;

  for (const [id, pathVal] of Object.entries(regions)) {
    const idx = newContent.indexOf(`id: "${id}"`);
    if (idx === -1) {
      throw new Error(`Could not find region: ${id}`);
    }
    
    const pathStart = newContent.indexOf('path: "', idx) + 7;
    const pathEnd = newContent.indexOf('"', pathStart);
    
    newContent = newContent.substring(0, pathStart) + pathVal + newContent.substring(pathEnd);
    console.log(`Updated region ${id} path successfully.`);
  }

  fs.writeFileSync(filePath, newContent, "utf8");
  console.log("\nInteractiveIndiaMap.tsx has been successfully updated with winding boundaries!");

} catch (err) {
  console.error("Error executing displacement: ", err.message);
  process.exit(1);
}
