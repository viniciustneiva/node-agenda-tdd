import { setYear, parseISO } from "date-fns";

/**
 * This function helps to generate dates in future to safe compare in tests cases
 * @param date @string
 * @returns Date @Date
 */
export function getFutureDate (date:string){
    return setYear(parseISO(date), new Date().getFullYear() +1)
}