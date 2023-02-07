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

module.exports = {
    gabja_alphabet_converter,
    gabja_number_converter,
};