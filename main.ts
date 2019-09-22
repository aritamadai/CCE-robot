/**
* extended blocks for CCE-robot
*/

enum CarDirection {
    //% block="前　進" enumval=0
    carForward,
    //% block="バック" enumval=1
    carBackward,
    //% block="右回転" enumval=2
    carTurnright,
    //% block="左回転" enumval=3
    carTurnleft
}

//% weight=112 color=#00A654 icon="\uf1b9" block="ロボット"

namespace robot {
    let pin_left_wheel = AnalogPin.P1
    let pin_right_wheel = AnalogPin.P2
    let power_left_wheel = 20
    let power_right_wheel = 20

    /**
    * TODO: initialization Custom car
    * @param left describe parameter here, eg: AnalogPin.P1
    * @param right describe parameter here, eg: AnalogPin.P2
    */

    //% blockId=custom_init block="左の車輪のピン番号 %left　|右の車輪のピン番号 %right"
    export function init_wheel(left: AnalogPin, right: AnalogPin): void {
        pin_left_wheel = left
        pin_right_wheel = right
    }

    /**
    * TODO: self power setting
    * @param Pleft the Pleft from 0 (min) to 100 (max), eg:15
    * @param Pright the Pright from 0 (min) to 100 (max), eg:15
    */
    //% blockId=CCE_hamabit_servos_power
    //% block="左の車輪の出力（％） %Pleft|　右の車輪の出力（％） %Pright"
    //% Pleft.min=0 Pleft.max=100
    //% Pright.min=0 Pright.max=100
    //% Pleft.defl=20
    //% Pright.defl=20
    export function power_wheel(Pleft: number, Pright: number): void {
        power_left_wheel = Pleft
        power_right_wheel = Pright
    }

    /**
    * Drives forwards. Call stop to stop
    */
    //% blockId=CCE_hamabit_servos_forward
    // block="drive forward"
    export function forward(): void {
        pins.servoSetPulse(pin_left_wheel, 9 * power_left_wheel + 1500)
        pins.servoSetPulse(pin_right_wheel, -9 * power_right_wheel + 1500)
    }

    /**
    * Drives backwards. Call stop to stop
    */
    //% blockId=CCE_hamabit_servos_backward
    // block="drive backward"
    export function backward(): void {
        pins.servoSetPulse(pin_left_wheel, -9 * power_left_wheel + 1500)
        pins.servoSetPulse(pin_right_wheel, 9 * power_right_wheel + 1500)
    }

    /**
	* Turns left. Call stop to stop
	*/
    //% blockId=CCE_hamabit_servos_left
    // block="turn left"
    export function left(): void {
        pins.servoSetPulse(pin_left_wheel, -9 * power_left_wheel + 1500)
        pins.servoSetPulse(pin_right_wheel, -9 * power_right_wheel + 1500)
    }

	/**
	* Turns right. Call ``stop`` to stop
	*/
    //% blockId=CCE_hamabit_servos_right
    // block="turn right"
    export function right(): void {
        pins.servoSetPulse(pin_left_wheel, 9 * power_left_wheel + 1500)
        pins.servoSetPulse(pin_right_wheel, 9 * power_right_wheel + 1500)
    }

	/**
	 * stop servos
	 */
    //% blockId=CCE_hamabit_servos_stop
    // block="stop"
    export function stop(): void {
        pins.digitalWritePin(<number>pin_left_wheel, 0)
        pins.digitalWritePin(<number>pin_right_wheel, 0)
    }

    /**
    * Drives forwards the requested time and then stops
    * @param value is forwarding time to move, eg:500
    */
    //% blockId=CCE_hamabit_drive_forwards
    //% block="前　進（ミリ秒） %value"
    //% value.shadow=timePicker
    //% value.defl=1000
    export function driveForwards(value: number): void {
        let timeToWait = value
        forward();
        //control.waitMicros(timeToWait);
        basic.pause(value);
        stop();
    }

    /**
    * TODO: move backward
    * @param value is backwarding time in seconds, eg:500
    */
    //% blockID=CCE_hamabit_drive_backwards
    //% block="バック（ミリ秒） %value"
    //% value.shadow=timePicker
    //% value.defl=1000
    export function driveBackwards(value: number): void {
        let timeToWait = value
        backward();
        basic.pause(value);
        stop();
    }

    /**
    * TODO: move turn right
    * @param value is turning time in seconds, eg:500
    */
    //% blockID=CCE_hamabit_drive_rightturns
    //% block="右回転（ミリ秒） %value"
    //% value.shadow=timePicker
    //% value.defl=1000
    export function turnRight(value: number): void {
        let timeToWait = value
        right();
        basic.pause(value);
        stop();
    }

    /**
    * TODO: move turn left
    * @param value is turning time in seconds, eg:500
    */
    //% blockID=CCE_hamabit_drive_leftturns
    //% block="左回転（ミリ秒） %value"
    //% value.shadow=timePicker
    //% value.defl=1000
    export function turnLeft(value: number): void {
        let timeToWait = value
        left();
        basic.pause(value);
        stop();
    }

    /**
     * Run a car
     * @param directon to turn the car in, eg: CarDirection.Forward
     * @param duration in milliseconds to run the car, eg: 500    
     */
    //% blockID=CCE_hamabit_drive_continuous
    //% block="連続走行 | %direction"
    // block="連続走行 || %direction"
    // expandableArgumentMode="toggle"
    export function continuousMotor(direction: CarDirection) {
        switch (direction) {
            case CarDirection.carForward:
                forward();
                break
            case CarDirection.carBackward:
                backward();
                break
            case CarDirection.carTurnright:
                right();
                break
            case CarDirection.carTurnleft:
                left();
                break
            default:
                stop();
        }
    }

    /**
    * TODO: stop
    */
    //% blockID=CCE_hamabit_drive_stop
    //% block="止まる"
    export function drivestop(): void {
        stop()
    }

    /**
    * Forwards through the requested time and power then stops
    * @param value describe time to move, eg:500
    * @param powerFactor the factor of wheel power adj　from 0 (min) to 200 (max),, eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_forward
    //% block="前　進（ミリ秒） %value|| 出力調整（％） %powerFactor"
    //% value.shadow=timePicker
    //% powerFactor.min=0 powerFactor.max=200
    //% value.defl=1000
    //% powerFactor.defl=80
    export function forwardP_wheel(value: number, powerFactor: number): void {
        let adj_left_power = Math.round(9 * power_left_wheel * (powerFactor / 100) + 1500)
        let adj_right_power = Math.round(-9 * power_right_wheel * (powerFactor / 100) + 1500)
        if (adj_left_power > 2400) {
            adj_left_power = 2400
        } else if (adj_left_power < 1500) {
            adj_left_power = 1500
        }
        if (adj_right_power < 600) {
            adj_right_power = 600
        } else if (adj_right_power > 1500) {
            adj_right_power = 1500
        }
        pins.servoSetPulse(pin_left_wheel, adj_left_power)
        pins.servoSetPulse(pin_right_wheel, adj_right_power)
        basic.pause(value);
        stop();
    }

    /**
    * Backwards through the requested time and power then stops
    * @param value describe time to move, eg:500
    * @param powerFactor the factor of wheel power adj　from 0 (min) to 200 (max),, eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_backward
    //% block="バック（ミリ秒） %value|| 出力調整（％） %powerFactor"
    //% value.shadow=timePicker
    //% powerFactor.min=0 powerFactor.max=200
    //% value.defl=1000
    //% powerFactor.defl=80
    export function backwardP_wheel(value: number, powerFactor: number): void {
        let adj_left_power = Math.round(-9 * power_left_wheel * (powerFactor / 100) + 1500)
        let adj_right_power = Math.round(9 * power_right_wheel * (powerFactor / 100) + 1500)
        if (adj_left_power < 600) {
            adj_left_power = 600
        } else if (adj_left_power > 1500) {
            adj_left_power = 1500
        }
        if (adj_right_power > 2400) {
            adj_right_power = 2400
        } else if (adj_right_power < 1500) {
            adj_right_power = 1500
        }
        pins.servoSetPulse(pin_left_wheel, adj_left_power)
        pins.servoSetPulse(pin_right_wheel, adj_right_power)
        basic.pause(value);
        stop();
    }

    /**
    * Turn right through the requested time and power then stops
    * @param value describe time to move, eg:500
    * @param powerFactor the factor of wheel power adj　from 0 (min) to 200 (max),, eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_rightTurn
    //% block="右回転（ミリ秒） %value|| 出力調整（％） %powerFactor"
    //% value.shadow=timePicker
    //% powerFactor.min=0 powerFactor.max=200
    //% value.defl=1000
    //% powerFactor.defl=80
    export function turnrightP_wheel(value: number, powerFactor: number): void {
        let adj_left_power = Math.round(9 * power_left_wheel * (powerFactor / 100) + 1500)
        let adj_right_power = Math.round(9 * power_right_wheel * (powerFactor / 100) + 1500)
        if (adj_left_power > 2400) {
            adj_left_power = 2400
        } else if (adj_left_power < 1500) {
            adj_left_power = 1500
        }
        if (adj_right_power > 2400) {
            adj_right_power = 2400
        } else if (adj_right_power < 1500) {
            adj_right_power = 1500
        }
        pins.servoSetPulse(pin_left_wheel, adj_left_power)
        pins.servoSetPulse(pin_right_wheel, adj_right_power)
        basic.pause(value);
        stop();
    }

    /**
    * Turn left through the requested time and power then stops
    * @param value describe time to move, eg:500
    * @param powerFactor the factor of wheel power adj　from 0 (min) to 200 (max),, eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_leftTurn
    //% block="左回転（ミリ秒） %value|| 出力調整（％） %powerFactor"
    //% value.shadow=timePicker
    //% powerFactor.min=0 powerFactor.max=200
    //% value.defl=1000
    //% powerFactor.defl=80
    export function turnleftP_wheel(value: number, powerFactor: number): void {
        let adj_left_power = Math.round(-9 * power_left_wheel * (powerFactor / 100) + 1500)
        let adj_right_power = Math.round(-9 * power_right_wheel * (powerFactor / 100) + 1500)
        if (adj_left_power < 600) {
            adj_left_power = 600
        } else if (adj_left_power > 1500) {
            adj_left_power = 1500
        }
        if (adj_right_power < 600) {
            adj_right_power = 600
        } else if (adj_right_power > 1500) {
            adj_right_power = 1500
        }
        pins.servoSetPulse(pin_left_wheel, adj_left_power)
        pins.servoSetPulse(pin_right_wheel, adj_right_power)
        basic.pause(value);
        stop();
    }

    /**
     * Run a car
     * @param directon to turn the car in, eg: CarDirection.Forward
     * @param duration in milliseconds to run the car, eg: 500    
     */
    //% advanced=true
    //% blockId=CCE_hamabit_run_motor
    //% block="走行 || %direction （ミリ秒） %duration"
    //% duration.shadow=timePicker
    //% expandableArgumentMode="toggle"
    export function runMotor(direction: CarDirection, duration: number) {
        switch (direction) {
            case CarDirection.carForward:
                driveForwards(duration);
                break
            case CarDirection.carBackward:
                driveBackwards(duration);
                break
            case CarDirection.carTurnright:
                turnRight(duration);
                break
            case CarDirection.carTurnleft:
                turnLeft(duration);
                break
            default:
                stop();
        }
    }

    /**
     * Set the car power and direction
     * @param directon to turn the car in, eg: CarDirection.Forward
     * @param power of the motor expressed as a percentage, eg: 80
     * @param duration in milliseconds to run the car, eg: 500    
     */
    //% advanced=true
    //% blockId=CCE_hamabit_set_motor_power
    //% block="調整走行 || %direction|（ミリ秒） %duration|出力調整（％） %power"
    //% duration.shadow=timePicker
    //% power.min=0 power.max=200
    //% expandableArgumentMode="enabled"
    export function setMotorPower(direction: CarDirection, duration: number, power: number) {
        switch (direction) {
            case CarDirection.carForward:
                forwardP_wheel(duration, power);
                break
            case CarDirection.carBackward:
                backwardP_wheel(duration, power);
                break
            case CarDirection.carTurnright:
                turnrightP_wheel(duration, power);
                break
            case CarDirection.carTurnleft:
                turnleftP_wheel(duration, power);
                break
            default:
                stop();
        }
    }
} 