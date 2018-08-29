import hashlib
import requests
import json


def get_md5_value(src):
    myMd5 = hashlib.md5()
    myMd5.update(src.encode("utf8"))
    myMd5_Digest = myMd5.hexdigest()
    return myMd5_Digest

def get_shal_value(src): 
    myShal = hashlib.sha1()
    myShal.update(src.encode("utf8"))
    myShal_Digest = myShal.hexdigest()
    return myShal_Digest

if __name__ == '__main__':

    #Õ∂◊¢
    j = 2
    while j <14:
        for i in range(91,100):
            num = str(i).rjust(3, '0')
            num1 = str(j).rjust(3, '0')
            j = j + 1


        #æ∫◊„
            src1 = '<?xml version="1.0" encoding="UTF-8"?><request><head sid="1001" merid="80008" timestamp="1" memo="" messageid="1"/><body><query><ticket idcard="411327197507122075" name="张兵" mobile="13766689711" lotid="1" apply="20180816' + num + '" code="SPF|201808164001=3/1,201808164' + num1 + '=3|*12" multi="99" money="396"/></query></body></request>'

            #æ∫¿∫
            #src1 = '<?xml version="1.0" encoding="UTF-8"?><request><head sid="1001" merid="80008" timestamp="1" memo="" messageid="1"/><body><query><ticket idcard="411327197507122075" name="Õı∂˛" mobile="13766689711" lotid="2" apply="20180816' + num + '" code="RFSF|201808164301=3/0,201808164' + num + '=3|2*1" multi="50" money="200"/></query></body></request>'

            #¥Û¿÷Õ∏
            #src1 = '<?xml version="1.0" encoding="UTF-8"?><request><head sid="1001" merid="80008" timestamp="1" memo="" messageid="1"/><body><query><ticket idcard="411327197507122075" name="Õı∂˛" mobile="13766689711" lotid="6" apply="20180816' + num + '" code="01,02,03,04,05|06,07:1:1" multi="2" money="4"/></query></body></request>'

            src2 = 'ximujdqwcstjfoxi'

            #src1 = '<?xml version="1.0" encoding="UTF-8"?><request><head sid="1001" merid="80000" timestamp="1" memo="" messageid="1"/><body><query><ticket idcard="" name="" mobile="13766689711" lotid="1" apply="20180611'+num+'" code="SPF|201806111101=3/1,201806111102=3|2*1" multi="99" money="396"/></query></body></request>'

            #src1 ='<?xml version="1.0" encoding="UTF-8"?><request><head sid="3001" merid="80002" timestamp="20180509181000" memo="" messageid="1"/><body><query/></body></request>'
            #src2 = 'caogen998866*&ecgefsc'

            #src1 = '<?xml version="1.0" encoding="UTF-8"?><request><head sid="2001" merid="80000" timestamp="20180509181000" memo="" messageid="1"/><body><query tid="1806071634420000021"/></body></request>'
            #src2 = 'hpcgrrnuiysgkmkq'

            src = src1 + src2
            result_md5_value = get_md5_value(src)
            result_shal_value = get_shal_value(src)

            #url = 'http://192.168.1.249:8082/mer'
            url = 'http://192.168.1.200:8082/mer'
            #url = 'https://opt.778668.cn:8086/mer'
            data = {'xml':src1,'sign':result_md5_value}

            r = requests.post(url,data)
            print(r.text)
            # print('source string:', src)
            # print('source string:', src1)
            # print('MD5:', result_md5_value)
            # print('SHA1:', result_shal_value)

    #merid="80001"   src2="wz998866*&abcefsc"
    #merid="80000"   src2="hpcgrrnuiysgkmkq"
    #merid="80002"   src2="caogen998866*&ecgefsc"


