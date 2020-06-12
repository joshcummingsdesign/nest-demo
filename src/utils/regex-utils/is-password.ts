export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#\$%&'()\*\+,-\.\/:;<=>\?@\[\\\]\^_`{\|}~]).{8,64}$/;

export const isPassword = (str: string) => PASSWORD_REGEX.test(str);
