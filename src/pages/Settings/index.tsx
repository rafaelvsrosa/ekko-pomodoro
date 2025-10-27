import styles from "./styles.module.css";

import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { useEffect, useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionsTypes } from "../../contexts/TaskContext/taskActions";

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Configurações - Ekko Pomodoro";
  }, []);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const formErrors = [];

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push("Digite apenas números para os campos");
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push("Digite apenas números entre 1 à 99 para Foco");
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push("Digite apenas números entre 1 à 30 para descanso curto");
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push("Digite apenas números entre 1 à 60 para descanso longo");
    }

    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        showMessage.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionsTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.success("Configurações salvas");
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: "center" }}>
          Modifique as configurações de tempo de foco, descanso curto e descanso
          longo como quiser.
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettings} action="" className="form">
          <div className={styles.formSettings}>
            <DefaultInput
              className={styles.inputSettings}
              id="workTime"
              labelText="Foco (min): "
              ref={workTimeInput}
              defaultValue={state.config.workTime}
              type="number"
            />
          </div>

          <div className={styles.formSettings}>
            <DefaultInput
              className={styles.inputSettings}
              id="shortBreakTime"
              labelText="Descanso curto (min):"
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
              type="number"
            />
          </div>

          <div className={styles.formSettings}>
            <DefaultInput
              className={styles.inputSettings}
              id="longBreakTime"
              labelText="Descanso longo (min):"
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
              type="number"
            />
          </div>

          <div className="formRow">
            <DefaultButton
              icon={<SaveIcon />}
              aria-label="Salvar configurações"
              title="Salvar configurações"
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
