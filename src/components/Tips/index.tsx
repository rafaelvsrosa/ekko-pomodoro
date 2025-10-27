import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForNoActiveTask = {
    workTime: (
      <span>
        Nesse ciclo <b>foque</b> por <b>{state.config.workTime} min.</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Nesse ciclo <b>descanse</b> por <b>{state.config.shortBreakTime} min.</b>
      </span>
    ),
    longBreakTime: <span>Próximo <b>descanso</b> será longo.</span>,
  };

  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        Fique em <b>foco</b> por <b>{state.config.workTime} min.</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        <b>Descanse</b> por <b>{state.config.shortBreakTime} min.</b>
      </span>
    ),
    longBreakTime: <span><b>Descanso longo.</b></span>,
  };

  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}
