// Lets any section pre-select a treatment in the appointment form.
export const SELECT_TREATMENT_EVENT = "azee:select-treatment";

export function selectTreatment(treatment) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SELECT_TREATMENT_EVENT, { detail: treatment }));
}
