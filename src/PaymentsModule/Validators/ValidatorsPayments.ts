import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customDateFormat', async: false })
export class CustomDateFormatValidator implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    const [month, year] = date.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100; // Tomar solo los últimos dos dígitos del año actual
    const maxYear = currentYear + 10; // Año máximo permitido (10 años en el futuro)

    // Validar mes y año
    if (month < 1 || month > 12) return false;
    if (year < currentYear || year > maxYear) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'La fecha debe tener un mes entre 01 y 12, y un año entre el año actual y hasta 10 años en el futuro.';
  }
}
