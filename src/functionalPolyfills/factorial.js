export default function factorial(n) {
    console.log(`working for ${n}`);
    if (n===1)  return 1;
    else  {
        return n* factorial(n-1);
    }
}