package spring;

import diff_functions.DiffFunction;
import diff_functions.DiffFunction1;
import diff_functions.DiffFunction2;
import diff_functions.DiffFunction3;
import methods.*;
import util.GraphPrinter;
import util.InputReader;
import util.TableGenerator;

import java.util.ArrayList;
import java.util.Objects;

public class Main {

    private static final DiffFunction[] diffFunctions = {
            new DiffFunction1(),
            new DiffFunction2(),
            new DiffFunction3()
    };

    private static final Method[] methods = {
            new Euler(),
            new RungeKutta4(),
            new Adamsa()
    };

    public Result points(int a, int b, double e, double x0, double y0, double xn, int n) {
        InputReader inputReader = new InputReader();
        DiffFunction diffFunction = diffFunctions[a - 1];
        Method method = methods[b - 1];
        Result result = method.calculate(x0, y0, xn, n, e, diffFunction);
//        TableGenerator tableGenerator = new TableGenerator();
//        System.out.println(tableGenerator.generate(result.getHeaders(), result.getData()));
        return result;
    }

}
