import styles from "./styles.module.css";

import { Container } from "../../components/Container";
import { MainTemplate } from "../../templates/MainTemplate";
import { Heading } from "../../components/Heading";
import { DefaultButton } from "../../components/DefaultButton";
import { Trash2Icon } from "lucide-react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/fotmatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionsTypes } from "../../contexts/TaskContext/taskActions";
import { Footer } from "../../components/Footer";

export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;

  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: "startDate",
        direction: "desc",
      };
    }
  );

  useEffect(() => {
    setSortTaskOptions((prevState) => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    document.title = "Histórico - Ekko Pomodoro";
  }, []);

  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false);

    dispatch({ type: TaskActionsTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
    const newDirection = sortTasksOptions.direction === "desc" ? "asc" : "desc";

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function hanldeResetHistory() {
    showMessage.dismiss();
    showMessage.confirm("Tem certeza que deseja apagar todo seu histórico?", (confirmation) => {
      setConfirmClearHistory(confirmation);
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span style={{ textAlign: 'center', fontWeight: 'bold' }}>Histórico</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<Trash2Icon />}
                color="red"
                aria-label="Apagar todo o histórico"
                title="Apagar histórico"
                onClick={hanldeResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: "name" })}
                    className={styles.thSort}
                  >
                    Tarefa ⬍
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: "duration" })}
                    className={styles.thSort}
                  >
                    Duração ⬍
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: "startDate" })}
                    className={styles.thSort}
                  >
                    Data ⬍
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortTasksOptions.tasks.map((task) => {
                  const taskTypeDictionary = {
                    workTime: "Foco",
                    shortBreakTime: "Descanso curto",
                    longBreakTime: "Descanso longo",
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!hasTasks && (
          <p className={styles.p}>
            Ainda não existem tarefas no seu histórico 🫠 🫠 <br /> Crie algumas tarefas e volte!
          </p>
        )}
      </Container>
    </MainTemplate>
  );

  <footer>
    <Footer />
  </footer>;
}
