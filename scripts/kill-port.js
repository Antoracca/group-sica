#!/usr/bin/env node
/**
 * kill-port.js — tue le process qui occupe un port avant de démarrer un serveur de dev.
 * Cross-platform : Windows (PowerShell) + Unix (lsof/kill).
 * Usage : node scripts/kill-port.js <port>
 */
const { execSync } = require("child_process");
const port = process.argv[2] || 3000;

try {
  if (process.platform === "win32") {
    execSync(
      `powershell -Command "` +
        `$p = (Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue).OwningProcess | Select-Object -Unique;` +
        `foreach ($id in $p) { Stop-Process -Id $id -Force -ErrorAction SilentlyContinue }"`,
      { stdio: "ignore" }
    );
  } else {
    execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: "ignore" });
  }
  console.log(`[kill-port] Port ${port} libere.`);
} catch {
  // Rien sur ce port, on continue.
  console.log(`[kill-port] Port ${port} deja libre.`);
}
