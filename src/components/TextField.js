import { ErrorMessage, useField } from "formik";
import {IMaskInput} from 'react-imask'

export const TextField = ({label, ...props}) => {

    const [field, meta] = useField(props);

    return(
        <div className="mb-2">
            <label htmlFor={field.name}>{label}</label>
            <input className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
            {...field} {...props} />

            <ErrorMessage component='div' name={field.name} className='alert alert-danger'/>
        </div>
    );
}