import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Dados iniciais
const initialRows = [
  { id: 1, titulo: 'Tarefa 1', descricao: 'Descrição da Tarefa 1', inicio: '2022-01-01', fim: '2022-01-02', status: 'Concluída', recurso: 'Recurso 1' },
  { id: 2, titulo: 'Tarefa 2', descricao: 'Descrição da Tarefa 2', inicio: '2022-01-03', fim: '2022-01-04', status: 'Em Andamento', recurso: 'Recurso 2' },
  // Outros dados...
];

const ListarTarefa = () => {
  const [tarefas, setTarefas] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = (tarefa) => {
    setTarefaSelecionada(tarefa);
    setOpenEditar(true);
  };
  const handleCloseEditar = () => setOpenEditar(false);

  const handleDeletar = (id) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'titulo', headerName: 'Título', width: 150 },
    { field: 'descricao', headerName: 'Descrição', width: 200 },
    { field: 'inicio', headerName: 'Início', width: 150 },
    { field: 'fim', headerName: 'Fim', width: 150 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'recurso', headerName: 'Recurso', width: 130 },
    {
      field: 'editar',
      headerName: '',
      width: 80,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleOpenEditar(params.row)}
        >
          <EditIcon fontSize="small" />
        </Button>
      ),
    },
    {
      field: 'deletar',
      headerName: '',
      width: 80,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeletar(params.row.id)}
        >
          <DeleteIcon fontSize="small" />
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tarefas}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
      <Button variant="contained" onClick={handleOpen} sx={{ mt: 2 }}>
        Criar Tarefa
      </Button>

      {/* Modal para criar tarefas */}
      <Modal open={open} onClose={handleClose}>
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>

      {/* Modal para editar tarefas */}
      <Modal open={openEditar} onClose={handleCloseEditar}>
        <div>
          <EditarTarefa
            handleCloseEditar={handleCloseEditar}
            tarefa={tarefaSelecionada}
            tarefas={tarefas}
            setTarefas={setTarefas}
          />
        </div>
      </Modal>
    </>
  );
};

export default ListarTarefa;
