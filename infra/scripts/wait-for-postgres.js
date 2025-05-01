const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      setTimeout(checkPostgres, 100);
      return;
    }
    console.log("\n🟢 Postgres está pronto para aceitar conexões!\n");
  }
}

process.stdout.write("\n🔴 Aguardando Postgres aceitar conexões");
checkPostgres();
