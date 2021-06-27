package online.ordering.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLDataException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import online.ordering.lookup.*;
import online.ordering.model.*;
import online.ordering.repository.*;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.hibernate.HibernateException;
import org.hibernate.JDBCException;
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Constants;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.MediaType;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import online.ordering.mailservice.mailsender;

import static java.lang.Integer.parseInt;
import static java.lang.Long.parseLong;
import  java.io.InputStream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

@RestController
public class controller {
	
	
	@Autowired
	private mailsender mailSend;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
			
	@Autowired
	private PassHistory_repository pass_repo;
				
	@Autowired
	private salCustomer_repository sal_customer_repo;
	
	@Autowired
	private LookupTypes_repository lookupType_repo;
	
	@Autowired
	private LookupValue_repository lookupValue_repo;

	@Autowired
	private Sys_Lookup_Values_Lang_Repository lookupValue_lang_repo;
	
	@Autowired
	private User_repository u_repo;
	

	private Customer_Persons Managers=new Customer_Persons();
	private Customer_Persons Contact_person=new Customer_Persons();

	
	@Autowired
	private CustomerAddress_repository address_repository;
	
	@Autowired
	private CustomerDocuments_repository documents_repository;
	
	@Autowired
	private CustomerPersons_repository Persons_repository;
	
	@Autowired
	private CustomerPhones_repository phones_repository;
		
	@Autowired
	private Erp_partner_classes_Repository partner_repo;

	@Autowired
	private Erp_Partner_Class_Lang_Repository partner_lang_repo;

	@Autowired
	private sal_customer_lang_repository customer_lang_repo;

	@Autowired
	private ErrorMessageLang_repository error_lang_repo;

	private String LastCustomerCode="";
	private long customer_id=0;

    String finalresult="";
    String customerInfo="";
	String customerDocumernts="";
	String customerManagers="";
	String customerContact="";
	String phones="";
	String customerAddresses="";

	public String language="";

	@RequestMapping(value="/logout",method=RequestMethod.GET)
	public ModelAndView closeSession(HttpServletRequest request){
		HttpSession session=request.getSession();
		session.invalidate();
		return new ModelAndView("NewBootstrapLogin.html");
	}//closeSessione

    @RequestMapping("/Saved")
    public ModelAndView locale() {
        return new ModelAndView("Saved.html");
    }

    @RequestMapping("/sign_up")
	public ModelAndView signUp()
	{
		return new ModelAndView("newSignUp.html");
	}
	
	@RequestMapping("/log_in")
	public ModelAndView login()
	{
		return new ModelAndView("NewBootstrapLogin.html");
	}
	
	@RequestMapping("/go_home")
	public ModelAndView GoToHomePage()
	{
		finalresult="";
		customerDocumernts="";
		customerManagers="";
		customerContact="";
		phones="";
		customerAddresses="";
		customerInfo="";
		customer_id=0;
		return new ModelAndView("home.html");

	}
	@RequestMapping (value = "/image")
	public @ResponseBody Resource  getImage() throws IOException {
		try {
			// read the file based on the filename
			Path rootLocation = Paths.get("E:\\DBFiles");
			Path file = rootLocation.resolve("add item method.PNG");
			// get resource from path
			Resource resource = new UrlResource(file.toUri());

			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new RuntimeException("Could not read the file!");
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException("Error: " + e.getMessage());
		}
	}

	/*@RequestMapping(value = "/sid", method = RequestMethod.GET,
			produces = MediaType.IMAGE_JPEG_VALUE)

	public void getImage(HttpServletResponse response) throws IOException {

		var imgFile = new ClassPathResource("DBFiles\\add item method.PNG");

		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(imgFile.getInputStream(), response.getOutputStream());
	}*/
	@RequestMapping(value = "/sid", method = RequestMethod.GET,
			produces = MediaType.IMAGE_JPEG_VALUE)

	public void getImage(HttpServletResponse response,@RequestParam("id")String filename) throws IOException {

		var imgFile = new ClassPathResource("DBFiles\\"+filename);

		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(imgFile.getInputStream(), response.getOutputStream());
	}

////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
	@RequestMapping("/findcurrency")
	public @ResponseBody String findCurrencies(@RequestParam ("id") long id, Model m)
	{
		System.out.println("inside find currency");
		System.out.println("id "+id);
		Map<String,Long> currencymap=new HashMap<>();
		currencymap=lookupValue_lang_repo.findPartnerCurrency(id);
		System.out.println("mymap currency "+ currencymap.values());
		List arr1=new ArrayList();
		arr1.add(currencymap.values());

		Map<String,Long> paymentmap=new HashMap<>();
		paymentmap=lookupValue_lang_repo.findPartnerPaymentMethod(id);
		System.out.println("mymap payment "+ paymentmap.values());
		List arr2=new ArrayList();
		arr2.add(paymentmap.values());

	    String result=currencymap.values().toString().substring( 1, currencymap.values().toString().length() - 1 )+","+paymentmap.values().toString().substring( 1, paymentmap.values().toString().length() - 1 );
	    System.out.println(result);

		return result;
	}

	@RequestMapping("/findcities")
	public @ResponseBody String findCities(@RequestParam ("id") long id, Model m)
	{
		System.out.println("inside find cities");
		System.out.println("id "+id);
		List<Map<String,Long>> CitiesList;
		CitiesList=lookupValue_lang_repo.findCitiesBasedOnCountry(id);
		String result="";
		for(int i=0;i<CitiesList.size();i++)
		{
			System.out.println(CitiesList.get(i).values());
			var str=CitiesList.get(i).values().toString().substring( 1, CitiesList.get(i).values().toString().length() - 1 )+",";
			System.out.println(str);
			result=result+str;
		}
		System.out.println(result);

		return result;
	}

	//////////////////////////////////////////////////////////////////////////////////////////////

	@RequestMapping("/AddCustomerMainData")
	public ModelAndView signup(Model m)
	{
		ModelAndView mv=new ModelAndView();

		List<sys_lookup_values_lang> AllCurrencies=lookupValue_lang_repo.findAllCurrencies();
		m.addAttribute("AllCurrencies",AllCurrencies);

		List<erp_partner_class_lang> AllClasses=partner_lang_repo.findAllClasses();
		m.addAttribute("AllClasses",AllClasses);
		System.out.println("Classes "+ AllClasses);

		Erp_partner_classes PartnerClass=partner_repo.findPartnerClass(16);
		m.addAttribute("Partner",PartnerClass);
		System.out.println("Partner  "+ PartnerClass);

		List<sys_lookup_values_lang> AllPaymentMethods=lookupValue_lang_repo.findAllPaymentMethods();
		m.addAttribute("AllPaymentMethods",AllPaymentMethods);

		List<sys_lookup_values_lang> AllClassesTypes=lookupValue_lang_repo.findAllCustomerType();
		m.addAttribute("AllClassesTypes",AllClassesTypes);

		List<sys_lookup_values_lang> Allstatuses=lookupValue_lang_repo.findAllStatuses();
		m.addAttribute("Allstatuses",Allstatuses);

		LastCustomerCode="C"+(sal_customer_repo.Last_Id()+1);
		m.addAttribute("Code","C"+(sal_customer_repo.Last_Id()+1));
		//m.addAttribute("Code","C"+Integer.parseInt(Character.toString(LastCustomerCode.charAt(1)))+1);
		m.addAttribute("array",UpdateCustomer(customer_id));

		mv.addObject("model",m);
		//mv.setViewName("AddCustomerByAdmin.html");
		mv.setViewName("CustomerMainData.html");
		//finalresult="";
		return mv;

	}

	@RequestMapping("/contact_info")
	public String Contact_Info(@RequestParam ("username") String name, @RequestParam ("statusid") long statusid
			, @RequestParam ("classid") long classid, @RequestParam ("currencyid") long currencyid
			, @RequestParam ("Paymentid") long Paymentid, @RequestParam ("credit") double credit
			, @RequestParam ("taxNumber") String taxNumber, @RequestParam ("vatID") String vatID
			, @RequestParam ("TaxRegistrationID") String TaxRegistrationID, @RequestParam ("typeid") int typeid
			, @RequestParam ("startDate") java.sql.Date startDate, @RequestParam ("endDate") java.sql.Date endDate, Model m,
									 @RequestParam ("us") String us, @RequestParam ("ar") String ar ) throws ParseException
	{
		System.out.println("INSIDE SAVE CUSTOMER");
		sal_Customer customer=new sal_Customer();
		customer.setCustomerCode(LastCustomerCode);

		customer.setCustomerName(name);		
		customer.setCustomerTypeId(typeid);
		customer.setPartnerClassId(classid);
		customer.setCurrency_id(currencyid);
		customer.setPaymentMethod_id(Paymentid);
		customer.setActiveStatusId(statusid);
		customer.setCreditLimit(credit);
		customer.setTaxCardNo(taxNumber);
		customer.setCommercialRecord(TaxRegistrationID);
		customer.setTaxFileNumber(vatID);	
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		System.out.println("startDate "+startDate);
		System.out.println("endDate "+endDate);
		//Date startdate = formatter.parse(startDate);
		//Date enddate = formatter.parse(endDate);
		customer.setStartDate(startDate);
		customer.setEndDate(endDate);

		//sal_customer_repo.save(customer);
		String message="";
		try{
			System.out.println("inside try");
			System.out.println(customer_id);
			sal_customer_repo.save(customer);
			message=1+","+"added successfully"+",";
			System.out.println(customer_id);

			LastCustomerCode=customer.getCustomerCode();
			customer_id=customer.getCustomerId();

			if(!us.isEmpty()&& !ar.isEmpty())
			{
				sal_customer_lang customer1=new sal_customer_lang();
				customer1.setLANGUAGE_CODE("US");
				customer1.setDESCRIPTION(us);
				customer1.setCustomerId(customer.getCustomerId());
				customer_lang_repo.save(customer1);
				sal_customer_lang customer2=new sal_customer_lang();
				customer2.setLANGUAGE_CODE("AR");
				customer2.setDESCRIPTION(ar);
				customer2.setCustomerId(customer.getCustomerId());
				customer_lang_repo.save(customer2);
			}
			else
			{
				sal_customer_lang customer1=new sal_customer_lang();
				customer1.setLANGUAGE_CODE("US");
				customer1.setDESCRIPTION(name);
				customer1.setCustomerId(customer.getCustomerId());
				sal_customer_lang customer2=new sal_customer_lang();
				customer_lang_repo.save(customer1);
				customer2.setLANGUAGE_CODE("AR");
				customer2.setDESCRIPTION(name);
				customer2.setCustomerId(customer.getCustomerId());
				customer_lang_repo.save(customer2);
			}
		}
		catch (DataIntegrityViolationException e)
		{
			SQLIntegrityConstraintViolationException  me = (SQLIntegrityConstraintViolationException) e.getRootCause();
			if(me.getLocalizedMessage().contains("TAX_CARD_NO"))
				message=0+","+"Tax ID "+error_lang_repo.getErrorMessage(me.getErrorCode())+",";
			else if(me.getLocalizedMessage().contains("COMM_RECORD"))
				message=0+","+"Commercial ID "+error_lang_repo.getErrorMessage(me.getErrorCode())+",";
			else if(me.getLocalizedMessage().contains("TAX_FILE_NO"))
				message=0+","+"VAT ID "+error_lang_repo.getErrorMessage(me.getErrorCode())+",";

		}

		
		/*ModelAndView mv=new ModelAndView();

		List<sys_lookup_values_lang> AllCountries=lookupValue_lang_repo.findAllCountries();
		m.addAttribute("AllCountries",AllCountries);

		List<sys_lookup_values_lang> AllCities=lookupValue_lang_repo.findAllCities();
		m.addAttribute("AllCities",AllCities);

		System.out.println("customer id "+customer_id);
		m.addAttribute("customer",customer_id);

		mv.addObject("model", m);
		mv.setViewName("Contact_Info.html");*/
		
		//System.out.println("startdate"+ startdate);
		return message;
	}

	@RequestMapping("/ContactInfoo")
	public ModelAndView ContactInfo(Model m)
	{
		ModelAndView mv=new ModelAndView();

		List<sys_lookup_values_lang> AllCountries=lookupValue_lang_repo.findAllCountries();
		m.addAttribute("AllCountries",AllCountries);

		List<sys_lookup_values_lang> AllCities=lookupValue_lang_repo.findAllCities();
		m.addAttribute("AllCities",AllCities);

		System.out.println("customer id "+customer_id);
        m.addAttribute("customer",customer_id);
        customerAddresses="";
		m.addAttribute("addresses",UpdateAddress(customer_id));
		m.addAttribute("phones",UpdatePhones(customer_id));
        customerInfo=sal_customer_repo.findEmailandurl(customer_id).toString();
        m.addAttribute("customer",customer_id);
        m.addAttribute("emailAndUrl",customerInfo);
		mv.addObject("model", m);
		//mv.setViewName("Contact_Info.html");
		mv.setViewName("Contact_Info.html");

		return mv;
	}
	
	@RequestMapping("/SaveCustomerLang")
	public void SaveCustomerLang(@RequestParam ("us") String us,
										 @RequestParam ("ar") String ar	)
	{
		sal_customer_lang customer1=new sal_customer_lang();
		customer1.setLANGUAGE_CODE("US");
		customer1.setDESCRIPTION(us);
		customer_lang_repo.save(customer1);
		sal_customer_lang customer2=new sal_customer_lang();
		customer2.setLANGUAGE_CODE("AR");
		customer2.setDESCRIPTION(ar);
		customer_lang_repo.save(customer2);
	}

	@RequestMapping("/Test_SaveContact")
	public String Test_SaveContact(Model m,@RequestParam ("email") String email,@RequestParam ("url") String URL,
										@RequestParam ("phoness") ArrayList <String> phones,@RequestParam ("Address") ArrayList<String> Addresses,
										@RequestParam (value = "phone" ,required = false) String phone,@RequestParam (value = "countryid", required = false) String countryid,
										 @RequestParam (value = "cityid" ,required = false) String cityid,@RequestParam (value = "address", required = false) String address,
										 @RequestParam (value = "primary", required = false) int primary)
	{
        String message="";
	    System.out.println("phones   "+phones);
		System.out.println("Addresses  "+ Addresses);
		Optional<sal_Customer> customerr=sal_customer_repo.findById(customer_id);
        sal_Customer customer=customerr.get();
		customer.setEmail(email);
		System.out.println(email);
		customer.setURL(URL);
		System.out.println(URL);
		try{
		sal_customer_repo.save(customer);
            message=1+","+"added successfully"+",";
        }
		catch (DataIntegrityViolationException e)
        {
            SQLIntegrityConstraintViolationException  me = (SQLIntegrityConstraintViolationException) e.getRootCause();
			if(me.getLocalizedMessage().contains(email))
            message=0+","+"Email "+error_lang_repo.getErrorMessage(me.getErrorCode())+",";
			if(me.getLocalizedMessage().contains(URL))
			message=0+","+"URL "+error_lang_repo.getErrorMessage(me.getErrorCode())+",";

		}
		System.out.println(Addresses.size());

		for(int i=0;i<Addresses.size();i+=6) {
				Customer_Address customer_address = new Customer_Address();

				customer_address.setCOUNTRY_ID(parseLong(Addresses.get(i)));
				customer_address.setCITY_ID(parseLong(Addresses.get(i+1)));
				customer_address.setADDRESS(Addresses.get(i+2));
				customer_address.setPRIMARY_FLAG(parseInt(Addresses.get(i+3)));
			//customer_address.setPRIMARY_FLAG(1);

				customer_address.setCustomer_id(customer.getCustomerId());
				address_repository.save(customer_address);

		}

		System.out.println("phone size"+phones.size());
		for(int i=0;i<phones.size();i++) {


				Customer_Phones phonee=new Customer_Phones();
				phonee.setPHONE_NO(phones.get(i));
				phonee.setCustomer_id(customer.getCustomerId());
			try{
				phones_repository.save(phonee);
				message+=1+","+"added successfully"+",";
			}
			catch (DataIntegrityViolationException  e)
			{
				SQLIntegrityConstraintViolationException  me = (SQLIntegrityConstraintViolationException) e.getRootCause();

				message+=0+","+"Phone number "+error_lang_repo.getErrorMessage(me.getErrorCode())+",";
			}

		}

		if(!phone.isEmpty())
		{
			Customer_Phones phonee=new Customer_Phones();
			phonee.setPHONE_NO(phone);
			phonee.setCustomer_id(customer.getCustomerId());

            try{
                phones_repository.save(phonee);
                message+=1+","+"added successfully"+",";
            }
            catch (DataIntegrityViolationException  e)
            {
                SQLIntegrityConstraintViolationException  me = (SQLIntegrityConstraintViolationException) e.getRootCause();

                message+=0+","+"Phone number "+error_lang_repo.getErrorMessage(me.getErrorCode())+",";
            }

		}
		if(countryid!=""&&cityid!=""&& !address.isBlank())
		{
			System.out.println("inside if save address country city add");
			System.out.println("country"+countryid+"city"+cityid+"add"+address+"primary"+primary);

			Customer_Address customer_address2 = new Customer_Address();

			customer_address2.setCOUNTRY_ID(parseInt(countryid));
			customer_address2.setCITY_ID(parseInt(cityid.substring(1,cityid.length())));
			customer_address2.setADDRESS(address);
			customer_address2.setPRIMARY_FLAG(primary);
			//customer_address.setPRIMARY_FLAG(1);

			customer_address2.setCustomer_id(customer.getCustomerId());
			address_repository.save(customer_address2);
		}

		ModelAndView mv=new ModelAndView();
		List<SYS_LOOKUP_VALUES> DocumentTypes=lookupValue_repo.findDocumentTypes();
		m.addAttribute("DocumentTypes",DocumentTypes);

		List<SYS_LOOKUP_VALUES> AllCountries=lookupValue_repo.FindAllCountries();
		m.addAttribute("AllCountries",AllCountries);

		mv.addObject("model", m);
		mv.setViewName("Legal_Documents.html");
		//mv.setViewName("NewLegalDocuments.html");
		System.out.println(message);
		return message;

	}

	@PostMapping ("/UpdatePhone")
	public String UpdatePhone(@RequestParam("id") String phoneid,Model m,@RequestParam ("phone") String phoneNo)
	{

		long phonid = parseLong(phoneid);
		Customer_Phones customer_phone=phones_repository.findByphoneID(phonid);

		customer_phone.setPHONE_NO(phoneNo);

		phones_repository.save(customer_phone);
		return "Updated";
	}
////////////////////////////////////////////////////////////////////////////////////////
	@RequestMapping("/findDescription")
	public String findlookup (@RequestParam("id") long id)
	{
		String result=lookupValue_repo.findLookupDecriptionn(id);
		System.out.println(result);
		return  result;
	}
	@RequestMapping("/Legal_Documents")
	public ModelAndView LegalDocuments(Model m)
	{
		ModelAndView mv=new ModelAndView();
		//List<SYS_LOOKUP_VALUES> DocumentTypes=lookupValue_repo.findDocumentTypes();
		List<sys_lookup_values_lang> DocumentTypes=lookupValue_lang_repo.findDocumentType();
		m.addAttribute("DocumentTypes",DocumentTypes);

		List<sys_lookup_values_lang> AllCountries=lookupValue_lang_repo.findAllCountries();
		m.addAttribute("AllCountries",AllCountries);

		List<Customer_Documents> AllDocuments=documents_repository.findCustomerId(customer_id);
		m.addAttribute("AllDocuments",AllDocuments);
		System.out.println("customer_id "+customer_id);
		System.out.println("AllDocuments"+AllDocuments.size());
		customerDocumernts="";
		//Long longObj = new Long(customer_id);
		m.addAttribute("customerId",customer_id);
		m.addAttribute("customerDocuments",UpdateDocument(customer_id));
		mv.addObject("model", m);

		mv.setViewName("Legal_Documents.html");
		//mv.setViewName("NewLegalDocuments.html");
		return mv;
	}
	

	//private static String UPLOADED_FOLDER = "E://DBFiles//";
	private static String UPLOADED_FOLDER ="src\\main\\resources\\DBFiles\\";
	@RequestMapping("/SaveDocuments")
	public long SaveDocuments(Model m, @RequestParam ("Documenttypeid") long Documenttypeid,
							  @RequestParam ("countryid") long countryid, @RequestParam ("IssuingDate") java.sql.Date IssuingDate,
							  @RequestParam ("EndDate") java.sql.Date EndDate, @RequestParam("picture") MultipartFile file,
							  @RequestParam("remark") String remark) throws IOException, ParseException
	{
		Customer_Documents customer_document=new Customer_Documents();
		
		byte[] bytes = file.getBytes();
        Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
        Files.write(path, bytes);
		
		customer_document.setDOC_TYPE_ID(Documenttypeid);
		customer_document.setCOUNTRY_ID(countryid);
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		//Date IssuingDatee = formatter.parse(IssuingDate);
		//Date EndDatee = formatter.parse(EndDate);
		customer_document.setISSUE_DATE(IssuingDate);
		customer_document.setISSUE_END_DATE(EndDate);
		//customer_document.setDOCUMENT_PHOTO_PATH(path.toString());
		customer_document.setDOCUMENT_PHOTO_PATH(file.getOriginalFilename());
		customer_document.setREMARKS(remark);
		customer_document.setCustomer_id(customer_id);
      //  System.out.println("path"+path.toString());
		
		documents_repository.save(customer_document);
		
		//return new ModelAndView("Managers.html");
		return customer_document.getDocId();

	}
	@GetMapping ("/DeleteDocument")
	public String deleteDocument(@RequestParam("id") Long DocumentId)
			 {
		Customer_Documents DOCUMENT = documents_repository.findByDocId(DocumentId);

		documents_repository.delete(DOCUMENT);

		return "Deleted";
	}
	@PostMapping ("/UpdateDocument")
	public String UpdateEmployee(@RequestParam("id") String documentId, Model m, @RequestParam ("Documenttypeid") long Documenttypeid,
								 @RequestParam ("countryid") long countryid, @RequestParam ("IssuingDate") java.sql.Date IssuingDate,
								 @RequestParam ("EndDate") java.sql.Date EndDate, @RequestParam("picture") MultipartFile file,
								 @RequestParam("remark") String remark)throws IOException, ParseException
	{

		long DocumentId = parseLong(documentId);
		Customer_Documents customer_document=documents_repository.findByDocId(DocumentId);

		byte[] bytes = file.getBytes();
		Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
		Files.write(path, bytes);

		customer_document.setDOC_TYPE_ID(Documenttypeid);
		customer_document.setCOUNTRY_ID(countryid);

		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		//Date IssuingDatee = formatter.parse(IssuingDate);
		//Date EndDatee = formatter.parse(EndDate);
		customer_document.setISSUE_DATE(IssuingDate);
		customer_document.setISSUE_END_DATE(EndDate);
		customer_document.setDOCUMENT_PHOTO_PATH(path.toString());
		customer_document.setREMARKS(remark);

		//  System.out.println("path"+path.toString());

		documents_repository.save(customer_document);
		return "Updated";
	}
////////////////////////////////////////////////////////////////////////////////////////
	@RequestMapping("/Managers")
	public ModelAndView Managers(Model m)
{
		List<Customer_Persons> persons=Persons_repository.findByCustomerIdAndPersonTypeId(customer_id,1);
		if(persons.size()>0)
		System.out.println("persons "+ persons.get(0).getPERSON_ID());
		m.addAttribute("persons",persons);
		m.addAttribute("customerId",customer_id);
		customerManagers="";
		m.addAttribute("managers",UpdateManager(customer_id));
		ModelAndView mv = new ModelAndView();
		mv.addObject("model",m);
		mv.setViewName("Managers.html");

		return mv;
		//return new ModelAndView("Managers.html");
}

	@RequestMapping("/SaveManager")
	public long SaveManager(Model m,@RequestParam ("name") String name,
							@RequestParam ("title") String title,@RequestParam ("phone") String phone,
							@RequestParam ("email") String email) throws IOException, ParseException
	{
		Customer_Persons customer_person=new Customer_Persons();

		customer_person.setFULL_NAME(name);
		customer_person.setTITLE(title);
		customer_person.setEMAIL(email);
		customer_person.setPHONE_NO(phone);
		customer_person.setPersonTypeId(1);
		customer_person.setCustomerId(customer_id);

		Persons_repository.save(customer_person);

		//return new ModelAndView("Managers.html");
		return customer_person.getPERSON_ID();

	}


    @GetMapping ("/DeleteManager")
    public String deleteManager(@RequestParam("id") Long ManagertId)
    {
        Customer_Persons manager = Persons_repository.findBypersonID(ManagertId);

        Persons_repository.delete(manager);

        return "Deleted";
    }
    @PostMapping ("/UpdateManager")
    public String UpdateManager(@RequestParam("id") String ManagerId,Model m,@RequestParam ("name") String name,
                                 @RequestParam ("title") String title,@RequestParam ("phone") String phone,
                                 @RequestParam ("email") String email)throws IOException, ParseException
    {

        long managerId = parseLong(ManagerId);
        Customer_Persons customer_persons=Persons_repository.findBypersonID(managerId);

        customer_persons.setFULL_NAME(name);
        customer_persons.setTITLE(title);
        customer_persons.setPHONE_NO(phone);
        customer_persons.setEMAIL(email);

        //  System.out.println("path"+path.toString());

        Persons_repository.save(customer_persons);
        return "Updated";
    }
/////////////////////////////////////////////////////////////////////////////////////////
	@RequestMapping("/Contact_Person")
	public ModelAndView Contact_Person(Model m)
	{
		List<Customer_Persons> persons=Persons_repository.findByCustomerIdAndPersonTypeId(customer_id,2);
		if(persons.size()>0)
		System.out.println("persons "+ persons.get(0).getPERSON_ID());
		m.addAttribute("persons",persons);
		m.addAttribute("customerId",customer_id);
		customerContact="";
		m.addAttribute("contactPersons",UpdateContactPerson(customer_id));
		ModelAndView mv = new ModelAndView();
		mv.addObject("model",m);
		mv.setViewName("Contactt_Person.html");
		//return new ModelAndView("Contactt_Person.html");
		return mv;

	}

	@RequestMapping("/SaveContactPerson")
	public long SaveContactPerson(Model m,@RequestParam ("name") String name,
							@RequestParam ("title") String title,@RequestParam ("phone") String phone,
							@RequestParam ("email") String email) throws IOException, ParseException
	{
		Customer_Persons customer_person=new Customer_Persons();

		customer_person.setFULL_NAME(name);
		customer_person.setTITLE(title);
		customer_person.setEMAIL(email);
		customer_person.setPHONE_NO(phone);
		customer_person.setPersonTypeId(2);
		customer_person.setCustomerId(customer_id);

		Persons_repository.save(customer_person);

		//return new ModelAndView("Managers.html");
		return customer_person.getPERSON_ID();

	}

	@GetMapping ("/DeleteContactPerson")
	public String DeleteContactPerson(@RequestParam("id") Long ContactId)
	{
		Customer_Persons contact = Persons_repository.findBypersonID(ContactId);

		Persons_repository.delete(contact);

		return "Deleted";
	}
	@PostMapping ("/UpdateContactPerson")
	public String UpdateContactPerson(@RequestParam("id") String ManagerId,Model m,@RequestParam ("name") String name,
								@RequestParam ("title") String title,@RequestParam ("phone") String phone,
								@RequestParam ("email") String email)throws IOException, ParseException
	{

		long managerId = parseLong(ManagerId);
		Customer_Persons customer_persons=Persons_repository.findBypersonID(managerId);

		customer_persons.setFULL_NAME(name);
		customer_persons.setTITLE(title);
		customer_persons.setPHONE_NO(phone);
		customer_persons.setEMAIL(email);

		//  System.out.println("path"+path.toString());

		Persons_repository.save(customer_persons);
		return "Updated";
	}
/////////////////////////////////////////////////////////////////////////////////////
@RequestMapping("/SaveAddress")
public long SaveAddress(Model m,@RequestParam ("countryid") long country,
							  @RequestParam ("cityid") long city,@RequestParam ("address") String address,
						@RequestParam (value="primary",required=false,defaultValue = "0") int primary) throws IOException, ParseException
{
	Customer_Address Address=new Customer_Address();

	Address.setCOUNTRY_ID(country);
	Address.setCITY_ID(city);
	Address.setADDRESS(address);
	Address.setPRIMARY_FLAG(primary);
	Address.setCustomer_id(customer_id);

	address_repository.save(Address);

	//return new ModelAndView("Managers.html");
	return Address.getADDRESS_ID();

}

	@GetMapping ("/DeleteAddress")
	public String DeleteAddress(@RequestParam("id") long AddressId)
	{
		Customer_Address Address = address_repository.findByaddressID(AddressId);

		address_repository.delete(Address);

		return "Deleted";
	}
	@PostMapping ("/UpdateAddress")
	public String UpdateAddress(@RequestParam("id") String AddressId,Model m,@RequestParam ("countryid") long country,
								@RequestParam ("cityid") long city,@RequestParam ("address") String address,
								@RequestParam (value="primary",required=false,defaultValue = "0") int primary)throws IOException, ParseException
	{

		long addressId = parseLong(AddressId);
		Customer_Address Address=address_repository.findByaddressID(addressId);

		Address.setCOUNTRY_ID(country);
		Address.setCITY_ID(city);
		Address.setADDRESS(address);
		Address.setPRIMARY_FLAG(primary);

		address_repository.save(Address);
		return "Updated";
	}
	/////////////////////////////////////////////////////////////////////////////////////
	@RequestMapping("/SavePhone")
	public long SavePhone(Model m,@RequestParam ("phone") String phone	) throws IOException, ParseException
	{
		Customer_Phones Phone=new Customer_Phones();

		Phone.setPHONE_NO(phone);
		Phone.setCustomer_id(customer_id);

		phones_repository.save(Phone);

		//return new ModelAndView("Managers.html");
		return Phone.getPHONE_ID();

	}

	@GetMapping ("/DeletePhone")
	public String DeletePhone(@RequestParam("id") long PhoneId)
	{
		Customer_Phones phone = phones_repository.findByphoneID(PhoneId);

		phones_repository.delete(phone);

		return "Deleted";
	}

	/////////////////////////////////////////////////////////////////////////////////////////////

    @RequestMapping("/CustomerFilter")
	public ModelAndView CustomerFilter(Model m)
	{
		ModelAndView mv=new ModelAndView();

		List<erp_partner_class_lang> AllClasses=partner_lang_repo.findAllClasses();
		m.addAttribute("AllClasses",AllClasses);

		List<sys_lookup_values_lang> AllStatuses=lookupValue_lang_repo.findAllStatuses();
		m.addAttribute("AllStatuses",AllStatuses);

		mv.addObject("model",m);
		mv.setViewName("CustomerFilter.html");
		return mv;
	}

	@RequestMapping("/SearchCustomer")
	public @ResponseBody String SearchCustomer(@RequestParam(required = false, name = "customername") String customername,@RequestParam(required = false, name = "classname") String classname,@RequestParam(required = false, name = "active") String active)
	{
		System.out.println("inside search controller ");
		//System.out.println("code "+code+" name " + classname);
		List<String> result=new ArrayList<>();
		long classid=0;
		if(classname.isBlank()) {classid=-1; System.out.println("class null");}
		else {classid=Long.parseLong(classname); System.out.println("class not null");}

		long statusid=0;
		if(active.isBlank()) {statusid=-1; System.out.println("active null");}
		else {statusid=Long.parseLong(active); System.out.println("active not null");}

		if(classid==-1&&customername.isEmpty()&&statusid==-1)
		{
			System.out.println("inside if");

			result=customer_lang_repo.findAllCustomersForSearch();

			System.out.println(result.get(0));
			System.out.println(result.toString().substring(1,result.toString().length()-1));
		}
		else if(classid!=-1&&!customername.isEmpty()&&statusid!=-1)
		{
			System.out.println("inside else1");
			System.out.println("customername "+customername+" classid "+classid+" statusid "+statusid);
			result=customer_lang_repo.findAllCustomersForSearch(customername,classid,statusid);
			//System.out.println(result.get(1));
		}
        else if(!customername.isEmpty()&&(statusid!=-1||classid!=-1))
        {
            System.out.println("inside else2");
            System.out.println("customername "+customername+" classid "+classid+" statusid "+statusid);
            result=customer_lang_repo.findCustomersForSearch(customername,classid,statusid);
            //System.out.println(result.get(1));
        }
        else if(statusid!=-1&&classid!=-1)
        {
            System.out.println("inside else3");
            System.out.println("customername "+customername+" classid "+classid+" statusid "+statusid);
            result=customer_lang_repo.findCustomersForSearch(classid,statusid);
            //System.out.println(result.get(1));
        }
        else if(classid!=-1||!customername.isEmpty()||statusid!=-1)
        {
            System.out.println("inside else4");
            System.out.println("customername "+customername+" classid "+classid+" statusid "+statusid);
            result=customer_lang_repo.findCustomersForSearchByOne(customername,classid,statusid);
            //System.out.println(result.get(1));
        }
		System.out.println(result.toString().substring(1,result.toString().length()-1));
		return result.toString().substring(1,result.toString().length()-1);
	}

	@GetMapping ("/DeleteCustomer")
	public String DeleteCustomer(@RequestParam("id") long customerId)  {
		System.out.println("inside delete message");
		Optional<sal_Customer> customerr = sal_customer_repo.findById(customerId);
		System.out.println("customerr "+customerr);
		String message="";
		try{
		sal_customer_repo.delete(customerr.get());
		System.out.println("deleted success");
		message=1+","+"deleted successfully";
		}
		//catch (Exception e)//SQLGrammarException //JDBCException//DataIntegrityViolationException
		catch (DataIntegrityViolationException  e)
		{
			SQLIntegrityConstraintViolationException  me = (SQLIntegrityConstraintViolationException) e.getRootCause();
			System.out.println(me.getErrorCode());
			//System.out.println(e.getMostSpecificCause());
			message=0+","+error_lang_repo.getErrorMessage(me.getErrorCode());
		}
		/*List<sal_customer_lang> customerlang=customer_lang_repo.findCustomersForDelete(customerId);
		customer_lang_repo.delete(customerlang.get(0));
		customer_lang_repo.delete(customerlang.get(1));*/
		return message;
	}

	@GetMapping ("/UpdateCustomer")
	public String UpdateCustomer(@RequestParam("id") long customertId)
	{
		finalresult="";
		if(customertId!=0) {
			System.out.println("customertId " + customertId);
			List<String> customer = customer_lang_repo.findCustomerMainDataForEdit(customertId);
			//partner_repo.delete(customerclass.get());
			String result = customer.get(0) + customer.get(1).split(",")[13];
			System.out.println("customerclass " + result);
			//Set<String> s=new HashSet<>(customerclass);
			String[] splitstr = customer.get(0).split(",");
			long curid = parseInt(splitstr[5]);
			long payid = parseInt(splitstr[4]);
			long typeid = parseInt(splitstr[2]);
			long activeid = parseInt(splitstr[7]);
			long classid = parseInt(splitstr[3]);
			System.out.println("curid " + curid);
			String currency = lookupValue_lang_repo.findLookup(curid);
			String payment = lookupValue_lang_repo.findLookup(payid);
			String customertype = lookupValue_lang_repo.findLookup(typeid);
			String active = lookupValue_lang_repo.findLookup(activeid);
			String classDescription = partner_lang_repo.findClassDescription(classid);
			System.out.println("currency " + currency + "payment " + payment + "customerType " + customertype);
			//System.out.println("s "+s);
			finalresult = splitstr[0] + "," + splitstr[1] + "," + customertype + "," + classDescription + "," + currency + "," + payment + "," + splitstr[6] + "," + active + ","
					+ splitstr[8] + "," + splitstr[9] + "," + splitstr[10] + "," + splitstr[11] + "," + splitstr[12] + "," + customer.get(1).split(",")[13] + "," + splitstr[14];

			System.out.println(finalresult);
		/*UpdateDocument(customertId);
		UpdateManager(customertId);
		UpdateContactPerson(customertId);
		UpdatePhones(customertId);
        UpdateAddress(customertId);*/
		}
		customer_id=customertId;
		return finalresult;
	}
	public String UpdateDocument(long id )
	{
		List<String> selectedCustomerDocumernts=documents_repository.findCustomerDocumentsForEdit(id);
		//String[] s1=selectedCustomerDocumernts.toString().split(",");
		for(int i=0;i<selectedCustomerDocumernts.size();i++){
		String[] s1= selectedCustomerDocumernts.get(i).split(",");
		System.out.println("customerDocumernts "+selectedCustomerDocumernts);
		String type=lookupValue_lang_repo.findLookup(Long.parseLong(s1[0]));
		String country=lookupValue_lang_repo.findLookup(Long.parseLong(s1[1]));
		customerDocumernts+=type+","+country+","+s1[2]+","+s1[3]+","+s1[4]+","+s1[5]+","+s1[6]+",";}
		System.out.println("customerDocumernts "+ customerDocumernts);
		return customerDocumernts;
	}
	public String UpdateManager(long id )
	{
		List<String> managers=Persons_repository.findCustomerManagersForEdit(id);
		customerManagers=managers.toString();
		System.out.println("Managers "+customerManagers.substring(1,customerManagers.length()-1));
		return customerManagers.substring(1,customerManagers.length()-1);
	}
	public String UpdateContactPerson(long id )
	{
		List<String> contact=Persons_repository.findCustomerContactForEdit(id);
		customerContact=contact.toString();
		System.out.println("ContactPerson "+customerContact.substring(1,customerContact.length()-1));
		return customerContact.substring(1,customerContact.length()-1);
	}
	public String UpdatePhones(long id )
	{
		List<String> phone=phones_repository.findCustomerPhonesForEdit(id);
		phones=phone.toString();
		System.out.println("ContactPerson "+phones.substring(1,phones.length()-1));
		return phones.substring(1,phones.length()-1);
	}
	public String UpdateAddress(long id )
	{
		List<String> addresses=address_repository.findCustomerAddressForEdit(id);
        for(int i=0;i<addresses.size();i++){
            String[] s1= addresses.get(i).split(",");
            System.out.println("customerAddresses "+addresses);
            String country=lookupValue_lang_repo.findLookup(Long.parseLong(s1[0]));
            String city=lookupValue_lang_repo.findLookup(Long.parseLong(s1[1]));
            customerAddresses+=country+","+city+","+s1[2]+","+s1[3]+","+s1[4]+",";}

		System.out.println("customerAddresses "+customerAddresses);
		return customerAddresses;
	}
	@RequestMapping ("/UpdateCustomerData")
	public String UpdateCustomerData(@RequestParam("id") String id,@RequestParam ("username") String name,@RequestParam ("statusid") long statusid
			,@RequestParam ("classid") long classid,@RequestParam ("currencyid") long currencyid
			,@RequestParam ("Paymentid") long Paymentid,@RequestParam ("credit") double credit
			,@RequestParam ("taxNumber") String taxNumber,@RequestParam ("vatID") String vatID
			,@RequestParam ("TaxRegistrationID") String TaxRegistrationID,@RequestParam ("typeid") int typeid
			,@RequestParam ("startDate") java.sql.Date startDate,@RequestParam ("endDate") java.sql.Date endDate
			) throws ParseException
	{
		System.out.println("INSIDE SAVE CUSTOMER");
		Optional<sal_Customer> customerr=sal_customer_repo.findById(Long.parseLong(id));
        sal_Customer newcustomer=customerr.get();
		newcustomer.setCustomerName(name);
		newcustomer.setCustomerTypeId(typeid);
		newcustomer.setPartnerClassId(classid);
		newcustomer.setCurrency_id(currencyid);
		newcustomer.setPaymentMethod_id(Paymentid);
		newcustomer.setActiveStatusId(statusid);
		newcustomer.setCreditLimit(credit);
		newcustomer.setTaxCardNo(taxNumber);
		newcustomer.setCommercialRecord(TaxRegistrationID);
		newcustomer.setTaxFileNumber(vatID);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		//Date startdate = formatter.parse(startDate);
		//Date enddate = formatter.parse(endDate);
		newcustomer.setStartDate(startDate);
		newcustomer.setEndDate(endDate);

		sal_customer_repo.save(newcustomer);

		/*if(!us.isEmpty()&& !ar.isEmpty())
		{
			sal_customer_lang customer1=new sal_customer_lang();
			customer1.setLANGUAGE_CODE("US");
			customer1.setDESCRIPTION(us);
			customer1.setCustomerId(newcustomer.getCustomerId());
			customer_lang_repo.save(customer1);
			sal_customer_lang customer2=new sal_customer_lang();
			customer2.setLANGUAGE_CODE("AR");
			customer2.setDESCRIPTION(ar);
			customer2.setCustomerId(newcustomer.getCustomerId());
			customer_lang_repo.save(customer2);
		}
		else
		{
			sal_customer_lang customer1=new sal_customer_lang();
			customer1.setLANGUAGE_CODE("US");
			customer1.setDESCRIPTION(name);
			customer1.setCustomerId(newcustomer.getCustomerId());
			sal_customer_lang customer2=new sal_customer_lang();
			customer_lang_repo.save(customer1);
			customer2.setLANGUAGE_CODE("AR");
			customer2.setDESCRIPTION(name);
			customer2.setCustomerId(newcustomer.getCustomerId());
			customer_lang_repo.save(customer2);
		}*/

		return "updated";
	}
	
	/////////////////////////////////////////////////////////////////////////////////
	  //for send array result to customer class page

	@RequestMapping("/Add_Lookup")
	public ModelAndView AddNewLookup(Model m)
	{

		ModelAndView mv=new ModelAndView();
		List<SYS_LOOKUP_TYPES> AllTypes=lookupType_repo.findAll();
		m.addAttribute("AllTypes",AllTypes);

		/*List<SYS_LOOKUP_TYPES> ParentLookup=lookupType_repo.findParents();
		m.addAttribute("ParentLookup",ParentLookup);*/

		List<sys_lookup_values_lang> AllCountries=lookupValue_lang_repo.findAllCountries();
		m.addAttribute("AllCountries",AllCountries);

		//LastLookupCode="C"+(lookupValue_repo.Last_Id()+1);
		m.addAttribute("Code","L"+(lookupValue_repo.Last_Id()+1));
		System.out.println("finalresult "+finalresult);
		m.addAttribute("array",finalresult);

		mv.addObject("model", m);
		mv.setViewName("NewLookup.html");
		finalresult="";
		return mv;
	}

	@PostMapping("/Add_Lookup_data")
	public ModelAndView AddNewLookupData(@RequestParam ("lookupTypes") String lookupType,
										 @RequestParam ("username") String lookupName,@RequestParam (value="ParentLookup", required = false,defaultValue = "0") long parentLookup,
										 @RequestParam (value="active",required=false,defaultValue = "0") int active,
										 @RequestParam ("us") String us,@RequestParam ("ar") String ar)
	{
		SYS_LOOKUP_VALUES values= new SYS_LOOKUP_VALUES();
		//SYS_LOOKUP_TYPES types =new SYS_LOOKUP_TYPES();

		values.setLookupType(lookupType);
		values.setLOOKUP_CODE("L"+(lookupValue_repo.Last_Id()+1));
		values.setDescription(lookupName);
		values.setLOOKUP_PARENT_ID(parentLookup);
		values.setEnableFlag(active);

		//lookupType_repo.save(types);
		lookupValue_repo.save(values);

		if(!us.isEmpty()&& !ar.isEmpty())
		{
			sys_lookup_values_lang customer1=new sys_lookup_values_lang();
			customer1.setLANGUAGE_CODE("US");
			customer1.setDESCRIPTION(us);
			customer1.setLOOKUP_ID(values.getLookupID());
			lookupValue_lang_repo.save(customer1);
			sys_lookup_values_lang customer2=new sys_lookup_values_lang();
			customer2.setLANGUAGE_CODE("AR");
			customer2.setDESCRIPTION(ar);
			customer2.setLOOKUP_ID(values.getLookupID());
			lookupValue_lang_repo.save(customer2);
		}
		else
		{
			sys_lookup_values_lang customer1=new sys_lookup_values_lang();
			customer1.setLANGUAGE_CODE("US");
			customer1.setDESCRIPTION(lookupName);
			customer1.setLOOKUP_ID(values.getLookupID());
			sys_lookup_values_lang customer2=new sys_lookup_values_lang();
			lookupValue_lang_repo.save(customer1);
			customer2.setLANGUAGE_CODE("AR");
			customer2.setDESCRIPTION(lookupName);
			customer2.setLOOKUP_ID(values.getLookupID());
			lookupValue_lang_repo.save(customer2);
		}


		return new ModelAndView("Saved.html");
	}

	@RequestMapping("/LookupFilter")
	public ModelAndView LookupFilter(Model m)
	{

		List<SYS_LOOKUP_TYPES> AllTypes=lookupType_repo.findAll();
		m.addAttribute("AllTypes",AllTypes);

		List<sys_lookup_values_lang> AllCountries=lookupValue_lang_repo.findAllCountries();
		m.addAttribute("AllCountries",AllCountries);

		List<sys_lookup_values_lang> AllCities=lookupValue_lang_repo.findAllCities();
		m.addAttribute("AllCities",AllCities);

		ModelAndView mv=new ModelAndView();
		mv.addObject("model",m);
		return mv;
	}

	@GetMapping ("/DeleteLookup")
	public String DeleteLookup(@RequestParam("id") long lookupId)
	{
		System.out.println("inside delete message");
		Optional<SYS_LOOKUP_VALUES> lookup = lookupValue_repo.findById(lookupId);

		String message="";
		try{
			lookupValue_repo.delete(lookup.get());
			System.out.println("deleted success");
			message=1+","+"deleted successfully";
		}
		//catch (Exception e)//SQLGrammarException //JDBCException//DataIntegrityViolationException
		catch (DataIntegrityViolationException  e)
		{
			SQLIntegrityConstraintViolationException  me = (SQLIntegrityConstraintViolationException) e.getRootCause();
			System.out.println(me.getErrorCode());
			//System.out.println(e.getMostSpecificCause());
			message=0+","+error_lang_repo.getErrorMessage(me.getErrorCode());
		}

		return message;
	}
	@GetMapping ("/UpdateLookup")
	public String UpdateLookup(@RequestParam("id") long lookupId)
	{
		finalresult="";
		System.out.println("lookuptId "+lookupId);
		List<String> lookups = lookupValue_lang_repo.findLookupForEdit(lookupId);
		System.out.println("lookups "+lookups);
		//partner_repo.delete(customerclass.get());
		String result=lookups.get(0)+","+lookups.get(1).split(",")[5];
		System.out.println("customerclass "+result);
		//Set<String> s=new HashSet<>(customerclass);
		String[] splitstr= lookups.get(0).split(",");
		System.out.println("splitstr[0] "+splitstr[0]);
		//String typeid= splitstr[0];
		System.out.println("splitstr[3] "+splitstr[3]);
		long parentid= parseInt(splitstr[3]);
		//System.out.println("typeid "+typeid);
		//String currency=lookupValue_lang_repo.findLookup(typeid);
		String parentlookup=lookupValue_lang_repo.findLookup(parentid);
		System.out.println("payment "+parentlookup);
		System.out.println("splitstr[2] "+splitstr[2]);
		System.out.println("lookups.get(1).split(\",\")[2] "+lookups.get(1).split(",")[2]);
		finalresult=splitstr[0]+","+splitstr[1]+","+splitstr[2]+","+parentlookup+","+splitstr[4]+","
				+splitstr[5]+","+lookups.get(1).split(",")[2];

		System.out.println(finalresult);
		return finalresult;
	}

	@PostMapping ("/UpdateLookupData")
	public String UpdateLookupData(@RequestParam("id") String lookupId,
										  @RequestParam ("lookupTypes") String lookuptype,@RequestParam ("ParentLookup") long ParentLookup,
										  @RequestParam ("username") String lookupname,
										  @RequestParam (value="active",required=false) int active)throws IOException, ParseException
	{

		long lookuppId = parseLong(lookupId);
		System.out.println("lookuppId "+lookuppId);
		Optional<SYS_LOOKUP_VALUES> lookups=lookupValue_repo.findById(lookuppId);
		System.out.println("lookups row "+lookups);
		SYS_LOOKUP_VALUES lookupobject=lookups.get();
		//classobject.setPARTNER_CLASS_CODE(code);
		lookupobject.setLookupType(lookuptype);
		lookupobject.setLOOKUP_PARENT_ID(ParentLookup);
		lookupobject.setDescription(lookupname);
		lookupobject.setEnableFlag(active);

		lookupValue_repo.save(lookupobject);
		finalresult="";
		return "Updated";
	}

	@RequestMapping("/findLookupDescription")
	public boolean IfLookupDescriptionFound(@RequestParam("desc") String description)
	{
		List<SYS_LOOKUP_VALUES> s=lookupValue_repo.findLookupDecription(description);
		System.out.println("s "+ s);
		if(s.size()==0) return false;
		else return true;
	}


	@RequestMapping("/findLookupValue")
	public @ResponseBody String findLookupValue(@RequestParam ("id") String id,@RequestParam(name="parent",required = false) String parent, Model m)
	{
		System.out.println("inside find cities");
		System.out.println("id "+id);
		List<Map<String,Long>> CitiesList;
		long parentid=0;
		if(parent.isBlank()) {parentid=-1; System.out.println("parent null");}
		else {parentid=Long.parseLong(parent); System.out.println("parent not null");}

		if(parentid==-1)
		{CitiesList=lookupValue_lang_repo.findLookupValuesBasedOnType(id);}
		else
		{CitiesList=lookupValue_lang_repo.findLookupValuesBasedOnTypeandParent(id,parentid);}
		String result="";
		for(int i=0;i<CitiesList.size();i++)
		{
			System.out.println(CitiesList.get(i).values());
			var str=CitiesList.get(i).values().toString().substring( 1, CitiesList.get(i).values().toString().length() - 1 )+",";
			System.out.println(str);
			result=result+str;
		}

		//String result=currencymap.values().toString().substring( 1, currencymap.values().toString().length() - 1 );
		System.out.println(result);

		return result;
	}

	@RequestMapping("/SearchLookups")
	public @ResponseBody String SearchLookups(@RequestParam(name="lookupTypes") String lookupTypes,@RequestParam(required = false, name = "cityid") String lookupvalue,@RequestParam(required = false, name = "ParentLookup") String parent)
	{
		System.out.println("inside search lookups ");
		System.out.println("lookupTypes "+lookupTypes+" lookupvalue " + lookupvalue+" ParentLookup "+parent);
		List<String> result=new ArrayList<>();

		long lookupvalueid=0;
		long parentid=0;
		System.out.println("lookupvalue"+lookupvalue);
		if(lookupvalue.isBlank()) {lookupvalueid=-1; System.out.println("inside value null");}
		else {lookupvalueid=Long.parseLong(lookupvalue.substring(1,lookupvalue.length())); System.out.println("value not null");}

		if(parent.isBlank()) {parentid=-1; System.out.println("parent null");}
		else {parentid=Long.parseLong(parent); System.out.println("parent not null");}

		System.out.println("outside if");

		if(lookupvalueid!=-1&&parentid!=-1)
		{
			System.out.println("inside if");

			result=lookupValue_lang_repo.findAllLookupsForSearch(lookupTypes,lookupvalueid,parentid);
			System.out.println(result.get(0));
			System.out.println(result.toString().substring(1,result.toString().length()-1));
		}
		else if(lookupvalueid==-1&&parentid==-1)
		{
			System.out.println("inside else1");

			result=lookupValue_lang_repo.findAllLookupsForSearch(lookupTypes);
			System.out.println(result.get(0));
			System.out.println(result.toString().substring(1,result.toString().length()-1));
		}

		else if(lookupvalueid!=-1||parentid!=-1)
		{
			System.out.println("inside else2");
			if(parentid==-1)
				result=lookupValue_lang_repo.findAllLookupsForSearch(lookupTypes,lookupvalueid);
			else result=lookupValue_lang_repo.findAllLookupsForSearch(lookupTypes,parentid);
			System.out.println(result.get(0));
			System.out.println(result.toString().substring(1,result.toString().length()-1));
		}


		System.out.println(result.toString().substring(1,result.toString().length()-1));
		return result.toString().substring(1,result.toString().length()-1);
	}

	////////////////////////////////////////////////////////////////////////////////
	@RequestMapping("/Customer_Classes")
	public ModelAndView ERP_Partners(Model m)
	{
		ModelAndView mv=new ModelAndView();

		List<sys_lookup_values_lang> AllCurrencies=lookupValue_lang_repo.findAllCurrencies();
		m.addAttribute("AllCurrencies",AllCurrencies);

		List<sys_lookup_values_lang> AllPaymentMethods=lookupValue_lang_repo.findAllPaymentMethods();
		m.addAttribute("AllPaymentMethods",AllPaymentMethods);
		String newcode="";
		if(Long.toString(partner_repo.Last_Id())==null)
		{ newcode="C0";	}
		else{newcode="C"+(partner_repo.Last_Id()+1);}

		m.addAttribute("Code",newcode);
		m.addAttribute("array",finalresult);

		mv.addObject("model",m);
		//mv.setViewName("AddCustomerByAdmin.html");
		mv.setViewName("Customer_Class.html");
		finalresult="";
		return mv;
	}

	@RequestMapping("/Add_CustomerClass_data")
	public ModelAndView CustomerClassData(@RequestParam ("username") String name,
										  @RequestParam ("currencyid") long currencyid,@RequestParam ("Paymentid") long Paymentid,
										  @RequestParam (value="active",required=false) int active,
										  @RequestParam ("us") String us,@RequestParam ("ar") String ar)
	{
		System.out.println("inside sava class lang");
		Erp_partner_classes partner=new Erp_partner_classes();

		partner.setPARTNER_CLASS_CODE("C"+(partner_repo.Last_Id()+1));
		partner.setDESCRIPTION(name);
		partner.setCURRANCY_ID(currencyid);
		partner.setPAYMENT_METHOD_ID(Paymentid);

		partner.setACTIVE_FLAG(active);
		partner.setPARTNER_TYPE_ID(1);

		partner_repo.save(partner);

		if(!us.isEmpty()&& !ar.isEmpty())
		{
			erp_partner_class_lang customer1=new erp_partner_class_lang();
			customer1.setLANGUAGE_CODE("US");
			customer1.setDESCRIPTION(us);
			customer1.setPARTNER_CLASS_ID(partner.getId());
			partner_lang_repo.save(customer1);
			erp_partner_class_lang customer2=new erp_partner_class_lang();
			customer2.setLANGUAGE_CODE("AR");
			customer2.setDESCRIPTION(ar);
			customer2.setPARTNER_CLASS_ID(partner.getId());
			partner_lang_repo.save(customer2);
		}
		else
		{
			erp_partner_class_lang customer1=new erp_partner_class_lang();
			customer1.setLANGUAGE_CODE("US");
			customer1.setDESCRIPTION(name);
			customer1.setPARTNER_CLASS_ID(partner.getId());
			erp_partner_class_lang customer2=new erp_partner_class_lang();
			partner_lang_repo.save(customer1);
			customer2.setLANGUAGE_CODE("AR");
			customer2.setDESCRIPTION(name);
			customer2.setPARTNER_CLASS_ID(partner.getId());
			partner_lang_repo.save(customer2);
		}

		return new ModelAndView("Saved.html");
	}

	@GetMapping ("/DeleteCustomerClass")
	public String DeleteCustomerClass(@RequestParam("id") long classtId)
	{
		Optional<Erp_partner_classes> customerclass = partner_repo.findById(classtId);

		String message="";
		try{
			partner_repo.delete(customerclass.get());
			System.out.println("deleted success");
			message=1+","+"deleted successfully";
		}
		//catch (Exception e)//SQLGrammarException //JDBCException//DataIntegrityViolationException
		catch (DataIntegrityViolationException  e)
		{
			SQLIntegrityConstraintViolationException  me = (SQLIntegrityConstraintViolationException) e.getRootCause();
			System.out.println(me.getErrorCode());
			//System.out.println(e.getMostSpecificCause());
			message=0+","+error_lang_repo.getErrorMessage(me.getErrorCode());
		}

		return message;
	}

	@GetMapping ("/UpdateCustomerClass")
	public String UpdateCustomerClass(@RequestParam("id") long classtId)
	{
		finalresult="";
		System.out.println("classtId "+classtId);
		List<String> customerclass = partner_lang_repo.findClasseForEdit(classtId);
        //partner_repo.delete(customerclass.get());
		String result=customerclass.get(0)+customerclass.get(1).split(",")[5];
		System.out.println("customerclass "+result);
		//Set<String> s=new HashSet<>(customerclass);
		String[] splitstr= customerclass.get(0).split(",");
		long curid= parseInt(splitstr[2]);
		long payid= parseInt(splitstr[3]);
		System.out.println("curid "+curid);
		String currency=lookupValue_lang_repo.findLookup(curid);
		String payment=lookupValue_lang_repo.findLookup(payid);
		System.out.println("currency "+currency+"payment "+payment);
		//System.out.println("s "+s);
		finalresult=splitstr[0]+","+splitstr[1]+","+customerclass.get(1).split(",")[5]+","+
                currency+","+payment+","+splitstr[4]+","+splitstr[5]+","+splitstr[6];
		System.out.println("splitstr[5]"+splitstr[5]);
		System.out.println("customerclass.get(1).split(',')[5]"+customerclass.get(1).split(",")[5]);

		System.out.println(finalresult);
		return finalresult;
	}
	@PostMapping ("/UpdateCustomerClassData")
	public String UpdateCustomerClassData(@RequestParam("id") String classId,
								@RequestParam ("username") String classname,@RequestParam ("currencyid") long currency,
										  @RequestParam ("Paymentid") long PaymentMethods,
								@RequestParam (value="active",required=false) int active)throws IOException, ParseException
	{

		long customerClassId = parseLong(classId);
		System.out.println("customerClassId "+customerClassId);
		Optional<Erp_partner_classes> customerclasss=partner_repo.findById(customerClassId);
		System.out.println("customerclasss "+customerclasss);
		Erp_partner_classes classobject=customerclasss.get();
		//classobject.setPARTNER_CLASS_CODE(code);
		classobject.setDESCRIPTION(classname);
		classobject.setCURRANCY_ID(currency);
		classobject.setPAYMENT_METHOD_ID(PaymentMethods);
		classobject.setACTIVE_FLAG(active);

		partner_repo.save(classobject);
		finalresult="";
		return "Updated";
	}

	@RequestMapping("/findClassDescription")
	public boolean IfClassDescriptionFound(@RequestParam("desc") String description)
	{
		Erp_partner_classes c=partner_repo.findClassDecription(description);
		System.out.println("c "+ c);
		if(c==null) return false;
		else return true;
	}

	@RequestMapping("/ClassFilter")
	public ModelAndView ClassFilter(Model m)
	{
		List<erp_partner_class_lang> AllClasses=partner_lang_repo.findAllClasses();
		m.addAttribute("AllClasses",AllClasses);
		System.out.println("Classes "+ AllClasses);
		ModelAndView mv=new ModelAndView();
		mv.addObject("model",m);
		mv.setViewName("CustomerClassFilter.html");
		return mv;
	}
	@RequestMapping("/SearchClass")
	public @ResponseBody String SearchClass(@RequestParam(required = false, name = "filtercode") String code,@RequestParam(required = false, name = "name") String classname)
	{
		System.out.println("inside search controller ");
		System.out.println("code "+code+" name " + classname);
		List<String> result=new ArrayList<>();
		long classid=0;
		if(classname.isBlank()) {classid=-1; System.out.println("parent null");}
		else {classid=Long.parseLong(classname); System.out.println("parent not null");}
		if(classid!=-1||!code.isEmpty())
		{
			System.out.println("inside if");
			long classnam=0;

			result=partner_lang_repo.findSearchedClasses(code,classid );
			System.out.println(result.get(0));
			System.out.println(result.toString().substring(1,result.toString().length()-1));
		}
		else if(classid==-1&&code.isEmpty())
		{
			System.out.println("inside else");
			result=partner_lang_repo.findAllClassesForSearch();
			System.out.println(result.get(1));
		}
		System.out.println(result.toString().substring(1,result.toString().length()-1));
		return result.toString().substring(1,result.toString().length()-1);
	}

	/////////////////////////////////////////////////////////////////////////////////////////////
	@PostMapping("/add_customerUser_data")
	public String AddCustomerUser(@RequestParam ("username") String name,@RequestParam ("useremail") String email,
			@RequestParam ("userpass") String password)
	{	
		User c=new User();
		c.setUsername(name);
		c.setEmail(email);		
		c.setPassword(bCryptPasswordEncoder.encode(password));
		PasswordsHistory passes=new PasswordsHistory();
		passes.setName(name);
		passes.setPassword(password);		 
		pass_repo.save(passes);
		u_repo.save(c);
		
		return"log_in";
				
	}
	
	
	///////////////////////////////////////////////////////////////////////
	@PostMapping("/check_login")
	public ModelAndView checkLoginInfo(@RequestParam("name") String name,@RequestParam("pass") String pass)
	{
		ModelAndView mv=new ModelAndView();
		Calendar calendar = Calendar.getInstance();
		
		Optional<User> optional = u_repo.findByUserName(name);
		System.out.println("optional"+optional);
		User custom = optional.get();
		if(!optional.isEmpty()&&bCryptPasswordEncoder.matches(pass,custom.getPassword() ))
		{			
			System.out.println("if condition ");
			System.out.println(optional!=null);
			//int account_access= (int) custom.getPasswordAccessCount();
			if(custom.getPasswordAllowedAccesses()!=0 && custom.getPasswordAllowedAccesses()>custom.getPasswordAccessCount())
			{
								 
				System.out.println("account_access  "+custom.getPasswordAccessCount() );
				custom.setPasswordAccessCount(custom.getPasswordAccessCount()+1);
				u_repo.save(custom);
				mv.setViewName("home.html");
			}
			else if(custom.getEndDate()!=null)
			{
				if(custom.getEndDate().compareTo(calendar.getTime())>0)
				{
					mv.setViewName("home.html");
					System.out.println("second if");
				}
				else {
					System.out.println("second else if");
					mv.setViewName("log_in.html");
				}
				
			}
			else if(custom.getAllowed_days()!=0)
			{
				Date d=custom.getStartDate();
				d.setDate(d.getDate()+custom.getAllowed_days());
				if(d.compareTo(calendar.getTime())>0) {
					mv.setViewName("home.html");
					System.out.println("third if");
				}
				else {
					mv.setViewName("log_in.html");
				}
			}
			else {
				mv.setViewName("home.html");
			}
		}
		else
		{
			mv.setViewName("log_in.html");
		}
		return mv;
	}
	
	
	
	///////////////////////////////////////////////////////////////////////
		// Display forgotPassword page
		//@RequestMapping(value = "/forgot", method = RequestMethod.GET)
		@RequestMapping("/forgot")
		public ModelAndView displayForgotPasswordPage() {
			return new ModelAndView("forgotpassword.html");
	    }
		String customertoken=null;
	    // Process form submission from forgotPassword page
		@RequestMapping("/forgott")
		public ModelAndView processForgotPasswordForm( @RequestParam("email") String userEmail, HttpServletRequest request) {
			
			// Lookup user in database by e-mail
			ModelAndView model=new ModelAndView(); 
			Optional<User> optional = u_repo.findByEmail(userEmail);
           System.out.println(optional);
			if (!optional.isPresent()) {
				model.addObject("errorMessage", "We didn't find an account for that e-mail address.");
			} else {
				
				// Generate random 36-character string token for reset password 
				User custom = optional.get();
				custom.setResetPasswordToken(UUID.randomUUID().toString());
				customertoken=custom.getResetPasswordToken() ;
				// Save token to database
				u_repo.save(custom);
				
				String appUrl = request.getScheme() + "://" + request.getServerName()+":"+request.getServerPort();
				System.out.println(appUrl);
				// Email message
				SimpleMailMessage passwordResetEmail = new SimpleMailMessage();
				passwordResetEmail.setFrom("support@demo.com");
				passwordResetEmail.setTo(custom.getEmail());
				passwordResetEmail.setSubject("Password Reset Request");
				passwordResetEmail.setText("To reset your password, click the link below:\n" + appUrl
						+ "/reset?token=" + custom.getResetPasswordToken());
				model.addObject("token",custom.getResetPasswordToken() );
				//passwordResetEmail.setText("To reset your password, click the link below:\n" + appUrl
				//					+ "/reset");
				/////////////////////////////////////////////////////////////////
				 JavaMailSender javamail= mailSend.getJavaMailSender();
				/////////////////////////////////////////////////////////////////
				mailSend.sendMail(passwordResetEmail,javamail);

				// Add success message to view
				model.addObject("successMessage", "A password reset link has been sent to " + userEmail);
			}

			model.setViewName("resetPassword.html");
			return model;

		}

		// Display form to reset password
		//@RequestMapping(value = "/reset", method = RequestMethod.GET)
		@RequestMapping("/reset")
		public ModelAndView displayResetPasswordPage(ModelAndView modelAndView, @RequestParam("token") String token) {
			
			Optional<User> user = u_repo.findByResetToken(token);

			if (user.isPresent()) { // Token found in DB
				modelAndView.addObject("resetToken", token);
			} else { // Token not found in DB
				modelAndView.addObject("errorMessage", "Oops!  This is an invalid password reset link.");
			}

			//System.out.println(modelAndView.getModel());
			modelAndView.setViewName("resetPassword.html");
			return modelAndView;
		}

		// Process reset password form
		//@RequestMapping(value = "/resett", method = RequestMethod.POST)
		@RequestMapping( "/resett")
		public ModelAndView setNewPassword(ModelAndView modelAndView, @RequestParam String pass, @RequestParam String newpass, RedirectAttributes redir) {

			// Find the user associated with the reset token
			Optional<User> user = u_repo.findByResetToken(customertoken);
            System.out.println(user +"  resett"); 
            boolean b= pass.equals(newpass);
            System.out.println(b);
			// This should always be non-null but we check just in case
			if (pass.equals(newpass)) {
				System.out.println("inside if condition"); 
				User resetUser = user.get(); 
	            
				// Set new password  
				List<PasswordsHistory> passwords =new ArrayList<PasswordsHistory>();
				passwords=pass_repo.findByname(resetUser.getUsername());
				//passwords=resetUser.getAllPasswords();
				int temp=0;
				//System.out.println("passwords.size()"+passwords.size()); 
				for(int i=0;i<passwords.size();i++)
				{
					//System.out.println("i"+i);
					//System.out.println("pass"+pass);
					//System.out.println("pass.get"+passwords.get(i).getPassword());
					if(pass.equals(passwords.get(i).getPassword()))
					{
						temp+=1;
						//System.out.println("temp1"+temp); 
					}
					//System.out.println("temp2"+temp); 					
				}
				if(temp==0)
				{
					 resetUser.setPassword(bCryptPasswordEncoder.encode(pass));
					// System.out.println(bCryptPasswordEncoder.encode(pass));
			        //System.out.println(bCryptPasswordEncoder.encode(pass));
					// Set the reset token to null so it cannot be used again
					 
					 PasswordsHistory passes=new PasswordsHistory();
					 passes.setName(resetUser.getUsername());
					 passes.setPassword(pass);
					 
					 pass_repo.save(passes);
					 
						resetUser.setResetPasswordToken("");
						customertoken=null;
						System.out.println("resetUser"+resetUser.getResetPasswordToken());
						// Save user
						u_repo.save(resetUser);
						

						// In order to set a model attribute on a redirect, we must use
						// RedirectAttributes
						redir.addFlashAttribute("successMessage", "You have successfully reset your password.  You may now login.");

						modelAndView.setViewName("log_in.html");
						//modelAndView.setViewName("redirect:log_in.html");
						//return modelAndView;
				}
	           
	           
				else
				{
					modelAndView.addObject("errorMessage", "Oops!  You had entered this password before.");
					modelAndView.setViewName("resetPassword.html");	
				}
				
			} else {
				modelAndView.addObject("errorMessage", "Oops!  This is an invalid password reset link.");
				modelAndView.setViewName("resetPassword.html");	
			}
			
			return modelAndView;
	   }    
	   
	  
}
