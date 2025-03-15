function status(request, response) {
  response
    .status(200)
    .json({ mensagem: "é para ficar feliz! Porque deu bom!" });
}

export default status;
