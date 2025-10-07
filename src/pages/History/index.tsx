import styles from "./styles.module.css";

import { Container } from "../../components/Container";
import { MainTemplate } from "../../templates/MainTemplate";
import { Heading } from "../../components/Heading";
import { DefaultButton } from "../../components/DefaultButton";
import { TrashIcon } from "lucide-react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/fotmatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks } from "../../utils/sortTasks";

export function History() {
  const { state } = useTaskContext();
  const sortedTasks = sortTasks({tasks: state.tasks});

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color="red"
              aria-label="Apagar todo o histórico"
              title="Apagar histórico"
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {sortedTasks.map((task) => {
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
              <tr>
                <td>Estudar</td>
                <td>25min</td>
                <td>20/04/2025 08:00</td>
                <td>Completa</td>
                <td>Foco</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
