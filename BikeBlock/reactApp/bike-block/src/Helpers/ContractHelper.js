

export function state(stateId) {

    switch(stateId) {
        case '0':
            return("None");
        case '1':
            return("Normal");
        case '2':
            return("Stolen");
        case '3':
            return("Found");
    }
}
