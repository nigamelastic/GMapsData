from selenium import webdriver
import sched, time

max_time = 3600#the amount of time variable
browser = webdriver.Chrome()
browser.get('https://www.google.co.in/maps/dir/12.914520,+77.680957/12.926112,+77.686034/@12.9186734,77.6646767,14z/data=!4m10!4m9!1m3!2m2!1d77.680957!2d12.91452!1m3!2m2!1d77.686034!2d12.926112!3e0')
timestr = time.strftime("%Y%m%d-%H%M%S")
file1 = open("Traffic"+timestr+".csv","w+")
file1.write("time,Route1-Ambalipura - Sarjapur Rd/Sarjapur Main Rd and NH 44,Route2-Ambalipura - Sarjapur Rd/Sarjapur Main Rd and NH 44\n")   
s = sched.scheduler(time.time, time.sleep)
file1.close()
ambl = "Ambalipura - Sarjapur Rd/Sarjapur Main Rd and NH 44"
ddkne ="Doddakannelli - Kaadubeesanahalli Rd"
start_time = time.time()  # remember when we started

while (time.time() - start_time) < max_time:
    file1 = open("Traffic"+timestr+".csv","a+")
    print time.asctime( time.localtime(time.time()) )
    x=time.asctime( time.localtime(time.time()) )
    ddknelixpath='(//span[contains(text(),"'+ddkne+'")]/parent::h1/parent::div/preceding-sibling::div/div/span)[1]'
    amblpraxpath='(//span[contains(text(),"'+ambl+'")]/parent::h1/parent::div/preceding-sibling::div/div/span)[1]'
    print(ddknelixpath)
    print(amblpraxpath)
    ddknel=browser.find_element_by_xpath(ddknelixpath)
    amblpra=browser.find_element_by_xpath(amblpraxpath)
    final=x+","+ddknel.text+","+amblpra.text+"\n"
    file1.write(final)
    browser.refresh()
    file1.close()
    time.sleep(5)

    # Update this to wherever u wanna save screenshots
    #browser.save_screenshot("screenshot"+str(time.time())+".png")
    
    
browser.quit()
