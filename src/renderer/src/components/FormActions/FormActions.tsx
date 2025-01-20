import { CustomButton } from '../CustomButton'
import './FormActions.css'

export function FormActions() {
  return (
    <section className="form-actions">
      <CustomButton variant="outlined" onClick={() => window.history.back()}>
        Cancelar
      </CustomButton>
      <CustomButton variant="contained" type="submit">
        Guardar
      </CustomButton>
    </section>
  )
}
