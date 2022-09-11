import requests, time, random, datetime,ftplib
import base64
import os, re, matplotlib
from reportlab.pdfgen import canvas
from reportlab.lib import utils
from reportlab.lib.pagesizes import letter
from reportlab.lib.pagesizes import landscape, portrait
from reportlab.platypus import Image
import matplotlib.pyplot as plt
from matplotlib.patches import Shadow
from PyPDF2 import PdfFileMerger, PdfFileReader
import numpy as np 
import pandas as pd
from PIL import Image
import streamlit as st
from web3 import Web3

st.set_page_config(
page_title="Carbon Footprint Calculator",
page_icon="🌎"
)

def get_base64_of_bin_file(bin_file):
    """
    function to read png file 
    ----------
    bin_file: png -> the background image in local folder
    """
    with open(bin_file, 'rb') as f:
        data = f.read()
    return base64.b64encode(data).decode()

def set_png_as_page_bg(png_file):
    """
    function to display png as bg
    ----------
    png_file: png -> the background image in local folder
    """
    bin_str = get_base64_of_bin_file(png_file)
    page_bg_img = '''
    <style>
    body {
    background-image: url("data:image/png;base64,%s");
    background-size: cover;
    }
    </style>
    ''' % bin_str
    
    st.markdown(page_bg_img, unsafe_allow_html=True)
    return

try:
    st.sidebar.markdown("<h1 style='text-align: center; color: black;'>🧭 Navigation Bar🧭</h1>", unsafe_allow_html=True)
    nav = st.sidebar.radio("",["Home 🏡","Prediction📟","Donate 💰"])
    if nav == "Home 🏡":
      set_png_as_page_bg("back.jpg")
      st.markdown("<h1 style ='color:#BB1D3F; text_align:center;font-family:times new roman;font-weight: bold;font-size:35pt;'>DEEP CARE 🌍❤️️ </h1>", unsafe_allow_html=True)  
      st.markdown("<h1 style='color:black;text_align:center;font-family:times new roman;font-size:20pt;font-weight: bold;'> A CARBON FOOTPRINT CALCULATOR</h1>", unsafe_allow_html=True)
      st.markdown("<h1 style='color:green;text-align: center;font-family:times new roman;font-size:25pt;font-weight: bold;'>Reduce your carbon footprint!</h1>", unsafe_allow_html=True)

    
    if nav == "Donate 💰":
        set_png_as_page_bg("earth.jpg")
        st.markdown(f"""<h1 style='text-align: center; font-weight:bold;color:black;background-color:powderblue;font-size:20pt;'>Make a Donation </h1>""",unsafe_allow_html=True)
        st.markdown(f"""<h1 style='text-align: center; font-weight:bold;color:red;font-size:12pt;'>We believe the Footprint Calculator serves a crucial purpose in the world: to help people explore what it means to live on our one planet.
We need your support to keep it going. </h1>""",unsafe_allow_html=True)
 
        st.markdown(f"""<h1 style='text-align: center; font-weight:bold;color:purple;font-size:12pt;'> When you donate, you’re supporting effective solutions to big environmental challenges—an investment for the future of our planet.
 </h1>""",unsafe_allow_html=True)
        st.markdown(f"""<h1 style='text-align: left; font-weight:bold;color:black;font-size:12pt;'>Connecting to demo account... </h1>""",unsafe_allow_html=True)
        
        temperature = st.slider('Donation Amount💰', min_value=1, step=1, max_value=5,value=1)
        if(st.button("Donate Now")):
            web3 = Web3(Web3.HTTPProvider('https://ropsten.infura.io/v3/47f01210553f44019e829a5534534aaa'))
            print(web3.isConnected())
            account1="0x19288ACB9D45a7bfa8836d523C2a4ad36f81C8ff"
            account2="0x525E00CB588Faf1Cb59644f1eDBC1c5049fAE71b"
            print(web3.eth.get_balance(account2))

            privatekey="21d836a4415ccf11db9ccd6bbc929148bfbe000f4d073011e156fe245ed869e2"
            nonce=web3.eth.getTransactionCount(account2)

            tx={
                'nonce': nonce,                      # transaction count
                'to': account2,              # who to send the ETH to
                'value': web3.toWei(1, 'ether'),       # the amount to transfer
                'gas':21000,
                'gasPrice': web3.toWei('50', 'gwei')        # get the price of gas

                }
            #signed_tx = w3.eth.account.sign_transaction(tx,account1_private_key)
            signed_tx = web3.eth.account.signTransaction(tx,privatekey)
            tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
            print(web3.toHex(tx_hash))
            print(web3.eth.get_balance(account1))
            print(web3.eth.get_balance(account2))
            st.balloons()
            st.image("https://upload.wikimedia.org/wikipedia/commons/e/e1/Payment_Done.gif", width=300)
           

    

    
    
    def clean_answer(answer):
        answer=answer.replace(' ','').replace('$','')
    
        if answer == 'y':
            answer='yes'
        elif answer == 'n':
            answer='no'
        # this is for intent querying 
        return answer
    
    


    
    def make_report(footprint, footprintdelta):
        # load the data here 
        g=open('report.txt').read()
    
        if footprintdelta < 0:
            footprintdelta = str(footprintdelta) + ' less than'
        else:
            footprintdelta = str(footprintdelta) + ' greater than'
    
        footprint=str(footprint) + ' tons of CO2/year'
    
        g=g.replace('[INSERT_FOOTPRINT_HERE]', footprint)
        g=g.replace('[INSERT_FOOTPRINTDELTA_HERE]', footprintdelta)
    
        return g
    
    # create a pdf 
    def calculate_footprint(answers):
        # create carbon calculator 
    
        # initialize answers 
        answer_1 = answers[0]
        answer_2 = answers[1]
        answer_3 = answers[2]
        answer_4 = answers[3]
        answer_5 = answers[4]
        answer_6 = answers[5]
        answer_7 = answers[6]
        answer_8 = answers[7]
        answer_9 = answers[8]
        answer_10 = answers[9]
        answer_11 = answers[10]
    
        # Electric bill = 7,252.76 kg CO2/year 
        # $0.1327/kwh/0.62 kg CO2/kwh = $0.214/kg CO2  - all we need to do is divide monthly bill by this.
        # electric bill = (electric bill / people in household) / ($0.214/kgCo2)     
        
        try:
            answer_1=answer_1.replace('$','')
            electric_=(int(answer_2)/int(answer_1))*12/0.214
        except:
            st.error('--> Error on electric CO2 calculation')
    
        # Flights = 602.448 kg CO2/year (if yes)
        # 286.88 kg CO2/flight 
        try:
            flight_= float(answer_3)*286.88 
        except:
            print('--> error on flight CO2 calculation')
            flight_=602.448
    
        # Transportation = 0.
        # 6,525.0 kg CO2/year (if drive only), 4,470.0 kg CO2/year (if mixed), 2,415.0 kg/year (if public)
        # 0.435 kg CO2/mile driving, 0.298 kg CO2/mile 50%/50% public transport and driving, and 0.161 kg CO2/mile (if public)
        # assume 220 working days/year (w/ vacation)
        try:
            transportation_=0
            if answer_4 == 'yes' and answer_6 == 'no':
                transportation_=float(answer_5)*1.61* 0.435*2*220
    
            elif answer_4 == 'yes' and answer_6 == 'yes':
                transportation_=float(answer_5)*1.61*0.298*2*220
    
            elif answer_4 == 'no' and answer_6 == 'yes':
                transportation_=float(answer_5)*1.61*0.161*2*220
    
            # Uber trips 
            # 45.27 kg CO2/year (average) 
            # 6 miles * 0.435 kg Co2/ mile = 2.61 kg CO2/trip 
            transportation_=transportation_+float(answer_8)*2.61*12
    
        except:
            st.error('--> error on transportation CO2 caclulation')
            transportation=4515.27
    
        # Vegetarian - assume footprint from food 
        try:
            if answer_9 == 'yes':
                food_=1542.21406
            # meat lover 
            elif answer_10 == 'yes':
                food_=2993.70964
            else:
                food_=2267.96185
        except:
            st.error('--> error on food CO2 calculation')
            food_=2267.96185
    
        # do you use amazon? --> retail, etc. 
        answer_11=answer_11.replace('$','').replace(' ','')
        retail_=0.1289*float(answer_11)
       
        footprint=electric_+flight_+transportation_+food_+retail_
        footprintbytype=[electric_, flight_, transportation_, food_, retail_]
    
        # compared to averages (kg Co2/year)
        footprint_avg = 14660.85
        footprintbytype_avg = [7252.76, 602.45, 4515.27, 2267.96, 22.41]
    
        footprint_delta=footprint-footprint_avg
        footprintbytype_delta=list(np.array(footprintbytype)-np.array(footprintbytype_avg))
    
        labels_footprint=['electric (kg Co2/year)', 'flight (kg Co2/year)', 'transportation (kg Co2/year)', 'food (kg Co2/year)', 'retail (kg Co2/year)']
        labels_footprintbytype = 'total kg Co2/year'
    
        return footprint, footprintbytype, footprint_delta, footprintbytype_delta, labels_footprint, labels_footprintbytype

      
                
                
    def cover_page(pdfname, surveyname, company, date, sampleid):
        c=canvas.Canvas(pdfname, pagesize=portrait(letter))
        c.drawImage("back.jpg", 0, 200, width=700,height=400, preserveAspectRatio=False)
        c.setFont('Helvetica-Bold', 16, leading=None)
        c.drawCentredString(300,460,"Carbon Footprint Report")
        c.setFont('Helvetica', 16, leading=None)
        c.drawCentredString(300,430,"%s"%(surveyname))
        c.drawCentredString(300,400,"%s"%(date[0:10]))
        c.save()
        return pdfname
    
    
    def make_graphs(individual_means, individual_means_2):
    
        # bar graph compared to average in each category (2 phase bar graph)
        labels = ['Electricity consumption (kwh * 1000)', 'No. of flights per year', 'Miles travelled per year (thousands)', 'No. of uber trips per year', 'Food choice (tons of CO2 emissions/year)']
        population_means = [11.698, 2.1, 15, 7.86, 2.5]
        population_means=list(map(int,population_means))
    
        print(labels)
        print(individual_means)
        print(population_means)
    
        x = np.arange(len(labels))  # the label locations
        width = 0.35  # the width of the bars
    
        fig, ax = plt.subplots()
        rects1 = ax.bar(x - width/2, individual_means, width, label='Your score', color='green')
        rects2 = ax.bar(x + width/2, population_means, width, label='Average score', color='red')
    
        # Add some text for labels, title and custom x-axis tick labels, etc.
        ax.set_ylabel('Scores')
        ax.set_title('Scores by label')
        ax.set_xticks(x)
        ax.set_xticklabels(labels, rotation='vertical') #rotation='vertical', fontsize='x-small',
        ax.legend()
    
        def autolabel(rects):
            """Attach a text label above each bar in *rects*, displaying its height."""
            for rect in rects:
                height = rect.get_height()
                ax.annotate('{}'.format(height),
                            xy=(rect.get_x() + rect.get_width() / 2, height),
                            xytext=(0, 2),  # 3 points vertical offset
                            textcoords="offset points",
                            ha='center', va='bottom')
    
    
        autolabel(rects1)
        autolabel(rects2)
    
        fig.tight_layout()
        # plt.show()
        plt.savefig('bar.png', format="png")
    
    
        # bar 2 
        labels = ['electricity', 'flights', 'transportation', 'food', 'retail']
        population_means = [7252.76, 602.45, 4515.27, 2267.96, 22.41]
        population_means=list(map(int,population_means))
        individual_means_2=list(map(int, individual_means_2))
    
        print(labels)
        print(individual_means_2)
        print(population_means)
    
        x = np.arange(len(labels))  # the label locations
        width = 0.35  # the width of the bars
    
        fig, ax = plt.subplots()
        rects1 = ax.bar(x - width/2, individual_means_2, width, label='Your score', color='#5dcf60')
        rects2 = ax.bar(x + width/2, population_means, width, label='Average score', color='#595959')
    
        # Add some text for labels, title and custom x-axis tick labels, etc.
        ax.set_ylabel('kg Co2/year')
        ax.set_title('Scores by label')
        ax.set_xticks(x)
        ax.set_xticklabels(labels, rotation='vertical') #rotation='vertical', fontsize='x-small',
        ax.legend()
    
        def autolabel(rects):
            """Attach a text label above each bar in *rects*, displaying its height."""
            for rect in rects:
                height = rect.get_height()
                ax.annotate('{}'.format(height),
                            xy=(rect.get_x() + rect.get_width(), height),
                            xytext=(0, 3),  # 3 points vertical offset
                            textcoords="offset points",
                            ha='center', va='bottom')
    
    
        autolabel(rects1)
        autolabel(rects2)
    
        fig.tight_layout()
        # plt.show()
        plt.savefig('bar_2.png', format="png")
    
        # % of contributions to your carbon footpint
        fig = plt.figure(figsize=(6, 6))
        ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])
    
        labels = ['Electricity', 'Flights', 'Transport', 'Food', 'Retail']
        fracs = [individual_means_2[0], individual_means_2[1], individual_means_2[2], individual_means_2[3], individual_means_2[4]]
        colors = ['yellow', 'orange', 'pink', 'green', 'red', 'violet']
        explode = (0, 0, 0, 0, 0)
    
        # We want to draw the shadow for each pie but we will not use "shadow"
        # option as it does'n save the references to the shadow patches.
        pies = ax.pie(fracs, explode=explode, labels=labels, autopct='%1.1f%%', colors=colors)
    
        for w in pies[0]:
            # set the id with the label.
            w.set_gid(w.get_label())
    
            # we don't want to draw the edge of the pie
            w.set_edgecolor("none")
    
        for w in pies[0]:
            # create shadow patch
            s = Shadow(w, -0.01, -0.01)
            s.set_gid(w.get_gid() + "_shadow")
            s.set_zorder(w.get_zorder() - 0.1)
            ax.add_patch(s)
    
        # save
        plt.savefig('pi.png', format="png")
    
    
    def make_bar_pdf(pdfname, logo):
    
        c=canvas.Canvas(pdfname, pagesize=portrait(letter))
        c.setFont('Helvetica-Bold', 16, leading=None)
        c.drawCentredString(300,600,"Your carbon consumption relative to the average American (units)")
        c.drawImage(logo, 0, 200, width=600,height=300, preserveAspectRatio=True)
        c.save()
    
    # def make_bar_2_pdf(pdfname, logo, footprint_delta):
    
    #     c=canvas.Canvas(pdfname, pagesize=portrait(letter))
    #     c.setFont('Helvetica-Bold', 16, leading=None)
    #     c.drawCentredString(300,600,"Your carbon consumption relative to the average American (kg CO2)")
    #     c.drawImage(logo, 0, 250, width=600,height=300, preserveAspectRatio=True)
    
    #     # now draw the delta 
    #     c.setFont('Helvetica', 11, leading=None)
    #     if float(footprint_delta) <= 0:
    #         c.drawCentredString(300, 200, "Your carbon consumption is %s kg CO2 less than the average American."%(footprint_delta))
    #     else:
    #         c.drawCentredString(300, 200, "Your carbon consumption is %s kg CO2 over the average American."%(footprint_delta))
    
    #     #powered by.. for branding 
    #     c.setFont('Helvetica-Bold', 12, leading=None)
    #     c.drawCentredString(300,100,"Powered by:")
    #     c.drawImage('logo.png', 250, 30, width=100,height=100, preserveAspectRatio=True)
    #     c.setFont('Helvetica', 12, leading=None)
    #     c.drawCentredString(300,50,"http://www.protea.earth")
    
    #     #wave looking thing on front page
    #     c.drawImage('footer.png', -100,-35,width=800,height=100,preserveAspectRatio=True)
    #     c.save()
    
    def make_pie_pdf(pdfname):
        c=canvas.Canvas(pdfname, pagesize=portrait(letter))
        logo="pi.png"
        c.setFont('Helvetica-Bold', 16, leading=None)
        c.drawCentredString(300,600,"Your carbon consumption: by category")
        c.drawImage(logo, 0, 200, width=600,height=300, preserveAspectRatio=True)
        c.save()
    
    
    def make_lastpage(pdfname):
        c=canvas.Canvas(pdfname, pagesize=portrait(letter))
        c.drawImage("back.jpg", 0, 200, width=700,height=400, preserveAspectRatio=False)
        c.setFont('Helvetica-Bold', 16, leading=None)
        c.drawCentredString(300,430,"Thanks for taking this survey!")
        c.drawCentredString(300, 400, "Reduce your carbon footprint!")
        c.save()    
    
    def merge_pdfs(pdflist):
        merger = PdfFileMerger()
        for pdf in pdflist:
           merger.append(PdfFileReader(open(pdf, 'rb')))
        merger.write('final_report.pdf')
        
    def get_binary_file_downloader_html(bin_file, file_label='File'):
            with open(bin_file, 'rb') as f:
                data = f.read()           
            bin_str = base64.b64encode(data).decode()
            href = f'<a href="data:application/octet-stream;base64,{bin_str}" download="{os.path.basename(bin_file)}">Download {file_label}</a>'
            return href

    def improvement_pdf(pdfname, truthlist):
        # areas of improvement (recommend areas of improvement)
        # how to be more involved
        
        c=canvas.Canvas(pdfname, pagesize=portrait(letter))
        c.setFont('Helvetica-Bold', 16, leading=None)
        c.drawCentredString(300,600,"Here are some recommendations to become a better citizen:")

        recommendation_list=['✍ Take efforts to clean nature (e.g. like recycling off the street)',
                       '✍ Collect and use clean energy (e.g. wind or solar power)',
                       '✍ Eat less meat when you can going out',
                       '✍ Buy local produce from farmers markets on weekends',
                       '✍ Exercise instead of uber to work',
                       '✍ Make eco-friendly purchases',
                       '✍ Plant trees or take care of plants in your house',
                       '✍ Try to recycle and reduce waste when you can',
                       '✍Take fewer flights and/or reduce your own transportation',
                       '✍ Turn off your air conditioning unit and use less electricity when you can',
                       '✍ Take showers for 5 minutes or less']
    
        recommendations=list()
        for i in range(len(truthlist)):
            if truthlist[i] == False:
                recommendations.append(recommendation_list[i])
    
        c.setFont('Helvetica', 11, leading=None)
        height=550
        for i in range(len(recommendations)):
            c.drawCentredString(300,height,recommendations[i])
            height=height-20
    
    
        #wave looking thing on front page
       # c.drawImage('footer.png', -100,-35,width=800,height=100,preserveAspectRatio=True)
    
        c.save()
            
    
    ##############################################################################
    ##                            MAIN SCRIPT                                   ##
    ##############################################################################
    #answer_1= answer_2= answer_3= answer_4= answer_5= answer_6= answer_7= answer_8= answer_9= answer_10= answer_11=""
    if nav == "Prediction📟":
        st.markdown(f"""<h1 style='text-align: center; font-weight:bold;color:white;background-color:green;font-size:20pt;'>Let's find your carbon footprint! 😉 </h1>""",unsafe_allow_html=True)
        st.write("")
        st.image("https://i.pinimg.com/originals/7e/69/ec/7e69eca344ca1465da94d698ded08e8e.gif", width=300)
        email=st.text_input('What is your email? \n')
        # example = 2 
        if email:
            st.image("https://i.pinimg.com/originals/61/b2/d3/61b2d33f39927afa72e5f57a28cc7c83.gif", width=300)
            answer_1 = st.text_input('How many people are in your household? (e.g. 2) \n')
            answer_1=clean_answer(answer_1)
            
            if answer_1:
            # example = 50 
                st.image("https://cdn.dribbble.com/users/282923/screenshots/11050247/paymentsbilling.gif", width=300)
                answer_2 = st.text_input('What is your electric bill monthly?  (e.g.₹ 50) \n')
                answer_2=clean_answer(answer_2)
                # example = 5 
                if answer_2:
                    st.image("https://cdn.dribbble.com/users/846207/screenshots/7617197/media/e87a923768846bc12f00539d66e80931.gif", width=300)
                    answer_3 = st.text_input('How many flights do you take per year? (e.g. 10) \n')
                    answer_3=clean_answer(answer_3)
                    if answer_3:
                    # example
                        st.image("https://i.pinimg.com/originals/1f/b3/fd/1fb3fd287f851da90e3ec73b10be294a.gif",width=300)
                        
                        answer_4 = st.text_input('Do you own a car? (e.g. n | y) \n')
                        answer_4=clean_answer(answer_4)
                        if answer_4:
                        # example = 1 
                            answer_5 = st.text_input('What is your average distance to commute to/from work in miles - for example 21? (e.g. 10) \n')
                            answer_5=clean_answer(answer_5)
                            if answer_5:
                            # example = yes
                                st.image("https://cdn.dribbble.com/users/2374064/screenshots/4737393/bus-truning.gif",width=250)
                                answer_6= st.text_input('Do you use public transportation? (e.g. y)\n')
                                answer_6=clean_answer(answer_6)
                                if answer_6:
                                # example = yes 
                                    st.image("https://thedutchdoor.in/wp-content/uploads/2019/08/rickshaw.gif",width=200)
                                    answer_7 = st.text_input('Do you use uber/redtaxi/ola or another ride sharing platforms? (e.g. y) \n')
                                    answer_7=clean_answer(answer_7)
                                    
                                    if answer_7 == 'yes':
                                        # example = 5
                                        answer_8 =st.text_input("How many ride-sharing trips do you complete per month? (e.g. 10) \n")
                                        answer_8=clean_answer(answer_8)
                                    else:
                                        answer_8 = '0'
                                    if answer_7:
                                    # example = yes
                                        st.image("https://static.wixstatic.com/media/975a91_ca6e48ebcffe42ecbcdfca8b306d4d17~mv2.gif",width=300)
                                        answer_9 =st.text_input('Are you a vegetarian? (e.g. n) \n')
                                        answer_9=clean_answer(answer_9)
                                        # example = no
                                        if answer_9:
                                            answer_10= st.text_input('Do you eat meat more than 3 times each week? (e.g. y) \n')
                                            answer_10=clean_answer(answer_10)
                                            # example = 50
                                            if answer_10:     
                                                answer_11 = st.text_input('How much money do you spend on stuffs per month ? (e.g. ₹150) \n')
                                                answer_11=clean_answer(answer_11)
                
     
        
            answers=[answer_1, answer_2, answer_3, answer_4, answer_5,
                     answer_6, answer_7, answer_8, answer_9, answer_10, answer_11]
        

        
        ## report on recommendations pop up + saved in directory
        footprint, footprintbytype, footprint_delta, footprintbytype_delta, labels_footprint, labels_footprintbytype =calculate_footprint(answers)
        
        data = {'email': email,
                #'questions': questions,
                'answers': answers,
                'footprint': footprint,
                'footprintbytype': footprintbytype,
                'footprint_delta': footprint_delta,
                'footprintbytype_delta': footprintbytype_delta,
                'labels_footprint': labels_footprint,
                'labels_footprintbytype': labels_footprintbytype}
        if(st.button('Predict')):
            st.success("YOUR EMISSION is {} kilograms of CO2/year".format(round(footprint,2)))
      
            # compared to averages 
            # footprint_avg = 14642.40 kg Co2/year 
            # footprintbytype_avg = [7252.76, 602.45, 4,4515.27, 2267.96]
            
            ########################################################
            ##              Now create the PDF                    ##
            ########################################################
    
           
            print(footprintbytype[3])
            # individual_means = ['Electricity consumption (kwh * 1000)', '# of flights per year', '# of driven miles/year (thousands)', '# of uber trips/year', 'food choice (tons of CO2 emissions/year)']
            if answer_4 == 'yes' and answer_6 == 'no':
                individual_means = [(int(answer_2)/0.1327)*12/1000, int(answer_3), int(answer_5)*220*2/1000, int(answer_8)*12, footprintbytype[3]/1000]
            elif answer_4 == 'yes' and answer_6 == 'yes':
                individual_means = [(int(answer_2)/0.1327)*12/1000, int(answer_3), int(answer_5)*220*2/1000, int(answer_8)*12,  footprintbytype[3]/1000]
            elif answer_4 == 'no' and answer_6 == 'yes':
                individual_means = [(int(answer_2)/0.1327)*12/1000, int(answer_3), int(answer_5)*220*2/1000, int(answer_8)*12, footprintbytype[3]/1000]
            else:
                individual_means = [(int(answer_2)/0.1327)*12/1000, int(answer_3), 0, int(answer_8)*12, footprintbytype[3]/1000]
            
            individual_means=list(map(int,individual_means))
   
            #['electric (kg Co2/year)', 'flight (kg Co2/year)', 'transportation (kg Co2/year)', 'food (kg Co2/year)', 'retail (kg Co2/year)']
            truthlist=[False, False, False, False, False, False, False, False, False, False, False]
            cover_page("1.pdf", email, 'User', str(datetime.datetime.now()), '100')
            make_graphs(individual_means, footprintbytype)
            make_bar_pdf("2.pdf",'bar.png')
            make_pie_pdf("3.pdf")
            improvement_pdf("4.pdf", truthlist)
            make_lastpage("5.pdf")
            pdflist=["1.pdf","2.pdf","3.pdf","4.pdf","5.pdf"]
            merge_pdfs(pdflist)
            st.markdown(get_binary_file_downloader_html("final_report.pdf", 'Your Final Report📝 '), unsafe_allow_html=True) 
   
except:
  # Prevent the error from propagating into your Streamlit app.
  pass
