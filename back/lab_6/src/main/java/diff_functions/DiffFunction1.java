package diff_functions;

// y' = y + x
// y = c * e^x - x - 1
// c = (y + x + 1) / (e ^ x)
public class DiffFunction1 extends DiffFunction {

    @Override
    public double f(double x, double y) {
        return y + x;
    }

    @Override
    public double y(double x, double x0, double y0) {
        double c = (y0 + x0 + 1) / (Math.exp(x0));

        return c * Math.exp(x) - x - 1;
    }

    @Override
    public String toString() {
        return "y' = y + x";
    }
}
