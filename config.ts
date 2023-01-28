//! Need to put a doulbe slash \\ to be able to insert a single slash in the regex

/**
 * Regular Expression for email validation
 * - Characters before and after the @
 * - At least one dot after the @
 * - A-Z characters allowed
 * - a-z characters allowed
 * - 0-9 numbers allowed
 * - Additionally email may contain only dot(.), dash(-), underscore(_) and other special characters
 */
export const regEmail = new RegExp("^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$");


/**
 * Regular Expression for Password - Complex
 * - Minimum eight characters
 * - One Uppercase letter
 * - One lowercase letter
 * - One number
 * - One Special Character
 */
export const regPasswordForRegistration = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");


/**
 * Regular Expression for Password - Simple
 * - Minimum eight characters
 */
export const regPasswordForLogin = new RegExp("^(?=.*\\d).{8,}$");

/**
 * Regular Expression for Username
 * - Username consists of alphanumeric characters (a-zA-Z0-9), lowercase, or uppercase.
 * - Username allowed of the dot (.), underscore (_), and hyphen (-).
 * - The dot (.), underscore (_), or hyphen (-) must not be the first or last character.
 * - The dot (.), underscore (_), or hyphen (-) does not appear consecutively, e.g., java..regex
 * - The number of characters must be between 5 to 20.
 */
export const regUsername = new RegExp("^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$");