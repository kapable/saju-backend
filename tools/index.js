const gabja_alphabet_converter = (char) => {
    const gabja_alphabet_index_array = [
        { alphabet: 'A', gabja: '甲' },
        { alphabet: 'B', gabja: '乙' },
        { alphabet: 'C', gabja: '丙' },
        { alphabet: 'D', gabja: '丁' },
        { alphabet: 'E', gabja: '戊' },
        { alphabet: 'F', gabja: '己' },
        { alphabet: 'G', gabja: '庚' },
        { alphabet: 'H', gabja: '辛' },
        { alphabet: 'I', gabja: '壬' },
        { alphabet: 'J', gabja: '癸' },
    ];
    return gabja_alphabet_index_array.find((idx) => idx.alphabet === char).gabja;
};

const gabja_number_converter = (num) => {
    const gabja_number_index_array = [
        { nums: '11', gabja:'子' },
        { nums: '12', gabja:'丑' },
        { nums: '01', gabja:'寅' },
        { nums: '02', gabja:'卯' },
        { nums: '03', gabja:'辰' },
        { nums: '04', gabja:'巳' },
        { nums: '05', gabja:'午' },
        { nums: '06', gabja:'未' },
        { nums: '07', gabja:'申' },
        { nums: '08', gabja:'酉' },
        { nums: '09', gabja:'戌' },
        { nums: '10', gabja:'亥' },
    ];
    return gabja_number_index_array.find((idx) => idx.nums === num).gabja;
};

const F_re_yukchin = (a, b, ilgan) => {
    let re_yukchin = "" // final return
    const kiEum5 = ["양목","음목","양화","음화","양토","음토","양금","음금","양수","음수"];
    let ss = "";
    switch (ilgan) {
        case "甲" : ss = 0; break;
		case "乙" : ss = 1; break;
		case "丙" : ss = 2; break;
		case "丁" : ss = 3; break;
		case "戊" : ss = 4; break;
		case "己" : ss = 5; break;
		case "庚" : ss = 6; break;
		case "辛" : ss = 7; break;
		case "壬" : ss = 8; break;
		case "癸" : ss = 9; break;
        default:
            break;
    };
    let kijun_5 = kiEum5[ss];
    let bikyo = kijun_5;

    if (b !== 10) {
        const tenEum5=["음수", "음토", "양목", "음목", "양토", "양화", "음화", "음토", "양금", "음금", "양토", "양수"];
        switch(a){
			case "子" : ss = 0; break;
			case "丑" : ss = 1; break;
			case "寅" : ss = 2; break;
			case "卯" : ss = 3; break;
			case "辰" : ss = 4; break;
			case "巳" : ss = 5; break;
			case "午" : ss = 6; break;
			case "未" : ss = 7; break;
			case "申" : ss = 8; break;
			case "酉" : ss = 9; break;
			case "戌" : ss = 10; break;
			case "亥" : ss = 11; break;
            default:
                break;
		};
        bikyo = tenEum5[ss];
    };
    
    let kijun_E = kijun_5[0];
    let bikyo_E = bikyo[0];
    let kijun_O = kijun_5[1];
    let bikyo_O = bikyo[1];

    let lifeassi = {"목생화":0, "화생토":1, "토생금":2, "금생수":3, "수생목":4};
    let lifekill = {"목극토":0, "토극수":1, "수극화":2, "화극금":3, "금극목":4};

    let ch_1 = lifeassi[kijun_O + '생' + bikyo_O];
    let ch_2 = lifekill[kijun_O + '극' + bikyo_O];
    let ch_3 = lifeassi[bikyo_O + '생' + kijun_O];
    let ch_4 = lifekill[bikyo_O + '극' + kijun_O];

    if(kijun_5 === bikyo){re_yukchin="比肩";};

	if(kijun_O === bikyo_O && kijun_E !== bikyo_E){re_yukchin="劫財";};

	if(kijun_O !==  bikyo_O){
		if(ch_1 !== 0 && kijun_E === bikyo_E){
			re_yukchin="食神";
		}else if (ch_1 !== 0 && kijun_E !== bikyo_E){
			re_yukchin="傷官";
		}else if (ch_2 !== 0 && kijun_E === bikyo_E){
			re_yukchin="偏財";
		}else if (ch_2 !== 0 && kijun_E !== bikyo_E){
			re_yukchin="正財";
		}else if (ch_3 !== 0 && kijun_E === bikyo_E){
			re_yukchin="偏印";
		}else if (ch_3 !== 0 && kijun_E !== bikyo_E){
			re_yukchin="正印";
		}else if (ch_4 !== 0 && kijun_E === bikyo_E){
			re_yukchin="偏官";
		}else if (ch_4 !== 0 && kijun_E !== bikyo_E){
			re_yukchin="正官";
		}else{
			re_yukchin="正官";
		};
	};
    return re_yukchin;
};

const F_mb_sibsin = (mb_sibsin_var) => {
    let mb_sibsin = "";
    switch(mb_sibsin_var){
		case "比肩" : mb_sibsin="01"; break;
		case "劫財" : mb_sibsin="02"; break;
		case "食神" : mb_sibsin="03"; break;
		case "傷官" : mb_sibsin="04"; break;
		case "偏財" : mb_sibsin="05"; break;
		case "正財" : mb_sibsin="06"; break;
		case "偏官" : mb_sibsin="07"; break;
		case "正官" : mb_sibsin="08"; break;
		case "偏印" : mb_sibsin="09"; break;
		case "正印" : mb_sibsin="10"; break;
	}
    return mb_sibsin;
};

const save_wealth_logic = (request_month, request_day) => {
    let serial_no = 0;

    if(request_month == "12" && request_day > 23 || request_month == "01" && request_day < 21){
        serial_no= 12;
    }else if(request_month == "01" && request_day > 20 || request_month == "02" && request_day < 20){
        serial_no=1;
    }else if(request_month == "02" && request_day > 19 || request_month == "03" && request_day < 21){
        serial_no=2;
    }else if(request_month == "03" && request_day > 20 || request_month == "04" && request_day < 21){
        serial_no=3;
    }else if(request_month == "04" && request_day > 20 || request_month == "05" && request_day < 22){
        serial_no=4;
    }else if(request_month == "05" && request_day > 21 || request_month == "06" && request_day < 22){
        serial_no=5;
    }else if(request_month == "06" && request_day > 21 || request_month == "07" && request_day < 24){
        serial_no=6;
    }else if(request_month == "07" && request_day > 23 || request_month == "08" && request_day < 24){
        serial_no=7;
    }else if(request_month == "08" && request_day > 23 || request_month == "09" && request_day < 24){
        serial_no=8;
    }else if(request_month == "09" && request_day > 23 || request_month == "10" && request_day < 24){
        serial_no=9;
    }else if(request_month == "10" && request_day > 23 || request_month == "11" && request_day < 23){
        serial_no=10;
    }else{
        serial_no=11;
    }

    return serial_no;
}

const mid_life_converter = (month_e, year_e) => {
    let total_02 = "";

    if(((month_e == "01") && (year_e == "11")) || 
    (( month_e == "12") && ( year_e == "12")) || 
    (( month_e == "11") && ( year_e == "01")) || 
    (( month_e == "10") && ( year_e == "02")) || 
    (( month_e == "09") && ( year_e == "03")) || 
    (( month_e == "08") && ( year_e == "04")) || 
    (( month_e == "07") && ( year_e == "05"))|| 
    (( month_e == "06") && ( year_e == "06"))|| 
    (( month_e == "05") && ( year_e == "07"))|| 
    (( month_e == "04") && ( year_e == "08"))|| 
    (( month_e == "03") && ( year_e == "09"))|| 
    (( month_e == "02") && ( year_e == "10")))   
    {
	    return total_02 = "11"  ;
    }
    else if(((month_e == "02") && (year_e == "11")) || 
    (( month_e == "01") && ( year_e == "12")) || 
    (( month_e == "12") && ( year_e == "01")) || 
    (( month_e == "11") && ( year_e == "02")) || 
    (( month_e == "10") && ( year_e == "03")) || 
    (( month_e == "09") && ( year_e == "04")) || 
    (( month_e == "08") && ( year_e == "05"))|| 
    (( month_e == "07") && ( year_e == "06"))|| 
    (( month_e == "06") && ( year_e == "07"))|| 
    (( month_e == "05") && ( year_e == "08"))|| 
    (( month_e == "04") && ( year_e == "09"))|| 
    (( month_e == "03") && ( year_e == "10")))   
    {
	    return total_02 = "12"  ;
    }
    else if(((month_e == "03") && (year_e == "11")) || 
    (( month_e == "02") && ( year_e == "12")) || 
    (( month_e == "01") && ( year_e == "01")) || 
    (( month_e == "12") && ( year_e == "02")) || 
    (( month_e == "11") && ( year_e == "03")) || 
    (( month_e == "10") && ( year_e == "04")) || 
    (( month_e == "09") && ( year_e == "05"))|| 
    (( month_e == "08") && ( year_e == "06"))|| 
    (( month_e == "07") && ( year_e == "07"))|| 
    (( month_e == "06") && ( year_e == "08"))|| 
    (( month_e == "05") && ( year_e == "09"))|| 
    (( month_e == "04") && ( year_e == "10")))   
    {
	    return total_02 = "01"  ;
    }
    else if(((month_e == "04") && (year_e == "11")) || 
    (( month_e == "03") && ( year_e == "12")) || 
    (( month_e == "02") && ( year_e == "01")) || 
    (( month_e == "01") && ( year_e == "02")) || 
    (( month_e == "12") && ( year_e == "03")) || 
    (( month_e == "11") && ( year_e == "04")) || 
    (( month_e == "10") && ( year_e == "05"))|| 
    (( month_e == "09") && ( year_e == "06"))|| 
    (( month_e == "08") && ( year_e == "07"))|| 
    (( month_e == "07") && ( year_e == "08"))|| 
    (( month_e == "06") && ( year_e == "09"))|| 
    (( month_e == "05") && ( year_e == "10")))   
    {
	    return total_02 = "02"  ;
    }
    else if(((month_e == "05") && (year_e == "11")) ||
    (( month_e == "04") && ( year_e == "12")) || 
    (( month_e == "03") && ( year_e == "01")) || 
    (( month_e == "02") && ( year_e == "02")) || 
    (( month_e == "01") && ( year_e == "03")) || 
    (( month_e == "12") && ( year_e == "04")) || 
    (( month_e == "11") && ( year_e == "05"))|| 
    (( month_e == "10") && ( year_e == "06"))|| 
    (( month_e == "09") && ( year_e == "07"))|| 
    (( month_e == "08") && ( year_e == "08"))|| 
    (( month_e == "07") && ( year_e == "09"))|| 
    (( month_e == "06") && ( year_e == "10")))   
    {
	    return total_02 = "03"  ;
    }
    else if(((month_e == "06") && (year_e == "11")) || 
    (( month_e == "05") && ( year_e == "12")) || 
    (( month_e == "04") && ( year_e == "01")) || 
    (( month_e == "03") && ( year_e == "02")) || 
    (( month_e == "02") && ( year_e == "03")) || 
    (( month_e == "01") && ( year_e == "04")) || 
    (( month_e == "12") && ( year_e == "05"))|| 
    (( month_e == "11") && ( year_e == "06"))|| 
    (( month_e == "10") && ( year_e == "07"))|| 
    (( month_e == "09") && ( year_e == "08"))|| 
    (( month_e == "08") && ( year_e == "09"))|| 
    (( month_e == "07") && ( year_e == "10")))   
    {
	    return total_02 = "04"  ;
    }
    else if(((month_e == "07") && (year_e == "11")) || 
    (( month_e == "06") && ( year_e == "12")) || 
    (( month_e == "05") && ( year_e == "01")) || 
    (( month_e == "04") && ( year_e == "02")) || 
    (( month_e == "03") && ( year_e == "03")) || 
    (( month_e == "02") && ( year_e == "04")) ||
    (( month_e == "01") && ( year_e == "05"))|| 
    (( month_e == "12") && ( year_e == "06"))|| 
    (( month_e == "11") && ( year_e == "07"))|| 
    (( month_e == "10") && ( year_e == "08"))|| 
    (( month_e == "09") && ( year_e == "09"))|| 
    (( month_e == "08") && ( year_e == "10")))   
    {
	    return total_02 = "05"  ;
    }
    else if(((month_e == "08") && (year_e == "11")) || 
    (( month_e == "07") && ( year_e == "12")) || 
    (( month_e == "06") && ( year_e == "01")) || 
    (( month_e == "05") && ( year_e == "02")) || 
    (( month_e == "04") && ( year_e == "03")) || 
    (( month_e == "03") && ( year_e == "04")) || 
    (( month_e == "02") && ( year_e == "05"))|| 
    (( month_e == "01") && ( year_e == "06"))|| 
    (( month_e == "12") && ( year_e == "07"))|| 
    (( month_e == "11") && ( year_e == "08"))|| 
    (( month_e == "10") && ( year_e == "09"))|| 
    (( month_e == "09") && ( year_e == "10")))  
    {
	    return total_02 = "06"  ;
    }
    else if(((month_e == "09") && (year_e == "11")) || 
    (( month_e == "08") && ( year_e == "12")) || 
    (( month_e == "07") && ( year_e == "01")) || 
    (( month_e == "06") && ( year_e == "02")) || 
    (( month_e == "05") && ( year_e == "03")) || 
    (( month_e == "04") && ( year_e == "04")) || 
    (( month_e == "03") && ( year_e == "05"))|| 
    (( month_e == "02") && ( year_e == "06"))|| 
    (( month_e == "01") && ( year_e == "07"))|| 
    (( month_e == "12") && ( year_e == "08"))|| 
    (( month_e == "11") && ( year_e == "09"))|| 
    (( month_e == "10") && ( year_e == "10")))   
    {
	    return total_02 = "07"  ;
    }
    else if(((month_e == "10") && (year_e == "11")) || 
    (( month_e == "09") && ( year_e == "12")) || 
    (( month_e == "08") && ( year_e == "01")) || 
    (( month_e == "07") && ( year_e == "02")) || 
    (( month_e == "06") && ( year_e == "03")) || 
    (( month_e == "05") && ( year_e == "04")) || 
    (( month_e == "04") && ( year_e == "05"))|| 
    (( month_e == "03") && ( year_e == "06"))|| 
    (( month_e == "02") && ( year_e == "07"))|| 
    (( month_e == "01") && ( year_e == "08"))|| 
    (( month_e == "12") && ( year_e == "09"))|| 
    (( month_e == "11") && ( year_e == "10")))   
    {
	    return total_02 = "08"  ;
    }
    else if(((month_e == "11") && (year_e == "11")) || 
    (( month_e == "10") && ( year_e == "12")) || 
    (( month_e == "09") && ( year_e == "01")) || 
    (( month_e == "08") && ( year_e == "02")) || 
    (( month_e == "07") && ( year_e == "03")) || 
    (( month_e == "06") && ( year_e == "04")) || 
    (( month_e == "05") && ( year_e == "05"))|| 
    (( month_e == "04") && ( year_e == "06"))|| 
    (( month_e == "03") && ( year_e == "07"))|| 
    (( month_e == "02") && ( year_e == "08"))|| 
    (( month_e == "01") && ( year_e == "09"))|| 
    (( month_e == "12") && ( year_e == "10")))   
    {
	    return total_02 = "09"  ;
    }
    else if(((month_e == "12") && (year_e == "11")) || 
    (( month_e == "11") && ( year_e == "12")) || 
    (( month_e == "10") && ( year_e == "01")) || 
    (( month_e == "09") && ( year_e == "02")) || 
    (( month_e == "08") && ( year_e == "03")) || 
    (( month_e == "07") && ( year_e == "04")) || 
    (( month_e == "06") && ( year_e == "05"))|| 
    (( month_e == "05") && ( year_e == "06"))|| 
    (( month_e == "04") && ( year_e == "07"))|| 
    (( month_e == "03") && ( year_e == "08"))|| 
    (( month_e == "02") && ( year_e == "09"))|| 
    (( month_e == "01") && ( year_e == "10")))   
    {
	    return total_02 = "10"  ;
    }
}

module.exports = {
    gabja_alphabet_converter,
    gabja_number_converter,
    F_re_yukchin,
    F_mb_sibsin,
    save_wealth_logic,
    mid_life_converter,
};