from selenium import webdriver
import sched, time

max_time = 3600#the amount of time variable
browser = webdriver.Chrome()
browser.get('https://www.google.co.in/maps/dir/12.926112,+77.686034/12.914520,+77.680957/@12.9206023,77.6670401,15z/data=!3m1!4b1!4m10!4m9!1m3!2m2!1d77.686034!2d12.926112!1m3!2m2!1d77.680957!2d12.91452!3e0')
timestr = time.strftime("%Y%m%d-%H%M%S")
filename = "Traffic"+timestr+"returnS.csv"
file1 = open(filename,"w+")
file1.write("time,Route1-Ambalipura - Sarjapur Rd/Sarjapur Main Rd and NH 44,Route2-Ambalipura - Sarjapur Rd/Sarjapur Main Rd and NH 44\n")   
s = sched.scheduler(time.time, time.sleep)
file1.close()
place1 = "Ambalipura - Sarjapur Rd/Sarjapur Main Rd"
place2 ="NH 44 and Ambalipura - Sarjapur Rd/Sarjapur Main Rd"
start_time = time.time()  # remember when we started

while (time.time() - start_time) < max_time:
    file1 = open(filename,"a+")
    print time.asctime( time.localtime(time.time()) )
    x=time.asctime( time.localtime(time.time()) )
    ddknelixpath='(//span[text()="'+place1+'"]/parent::h1/parent::div/preceding-sibling::div/div/span)[1]'
    amblpraxpath='(//span[text()="'+place2+'"]/parent::h1/parent::div/preceding-sibling::div/div/span)[1]'
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
