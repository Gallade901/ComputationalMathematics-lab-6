package spring;

import methods.Result;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;


@RestController
@RequestMapping("/app-controller")
@CrossOrigin(origins = "*")
public class Controller {
    Main main = new Main();

    @PostMapping("/points")
    public ResponseEntity points(@RequestBody HashMap<String, Number> points) {
        int a = (int) points.get("chooseInput1");
        int b = (int) points.get("chooseInput2");
        int n = (int) points.get("countInput");
        double x0 = ((Number) points.get("x0")).doubleValue();
        double y0 = ((Number) points.get("y0")).doubleValue();
        double xn = ((Number) points.get("xn")).doubleValue();
        double e = ((Number) points.get("accuracy")).doubleValue();;
        Result ans = main.points(a, b, e, x0, y0, xn, n);
        return ResponseEntity.ok(ans);
    }

    @GetMapping("/welcome")
    public ResponseEntity welcome() {
        return ResponseEntity.ok("welcome");
    }
}
