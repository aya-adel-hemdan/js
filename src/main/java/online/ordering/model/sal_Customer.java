package online.ordering.model;




import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;


import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;


@Entity
@Table(name = "sal_customers")

public class sal_Customer {
	 
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name="CUSTOMER_ID") 
		private long customerId;
	    
	    @Column(name="CUSTOMER_CODE") 
	    private String CustomerCode;
	    
	    @Column(name="FULL_NAME") 
		private String CustomerName;
	    	    	    	    	    	    	    
	    @Column(name="PARTNER_CLASS_ID") 
	    private long PartnerClassId;
	    
	    @Column(name="CURRANCY_ID") 
	    private long Currency_id;
	    
	    @Column(name="PAYMENT_METHOD_ID") 
	    private long paymentMethod_id;
	    
	    @Column(name="CREDIT_LIMIT") 
	    private double CreditLimit;
	    
	    @Column(name="TAX_FILE_NO") 
	    private String TaxFileNumber;
	    
	    @Column(name="COMM_RECORD") 
	    private String CommercialRecord;
	    
	    @Column(name="TAX_CARD_NO") 
	    private String TaxCardNo;
	    
	    @Email (message="please enter a valid email")
	    @Column(unique = true,nullable=false ,name="EMAIL")
	    private String email;
	    
	    @Column(name="FAX_NO") 
	    private String FaxNo;
	    
	    @Column(name="URL") 
		private String URL;
		
		@Column(name="ACTIVE_STATUS_ID") 
		private long ActiveStatusId;
	    
		@DateTimeFormat(pattern = "yyyy-MM-dd")
		@Column(name="END_DATE") 
	    private Date EndDate;
	    
	    @DateTimeFormat(pattern = "yyyy-MM-dd")
	    @Column(name="START_DATE") 
	    private Date StartDate; 
	    
	    @Column(name="CREATED_BY") 
	    private long CreatedBy;

	    @Column(name="CREATION_DATE") 
	    private Date CreationDate;
	    
	    @Column(name="LAST_UPDATE_BY") 
	    private long LastUpdatedBy;
	    
	    @Column(name="LAST_UPDATE_DATE") 
	    private Date LastUpdateDate;
	    
	    @Column(name="CUSTOMER_TYPE_ID") 
	    private long CustomerTypeId;
	    
	    @Column(name="USER_VERIFICATION_CODE") 
	    private String VerificationCode;
	    

		public long getCustomerId() {
			return customerId;
		}

		public void setCustomerId(long customerId) {
			customerId = customerId;
		}

		public String getCustomerCode() {
			return CustomerCode;
		}

		public void setCustomerCode(String customerCode) {
			CustomerCode = customerCode;
		}

		public String getCustomerName() {
			return CustomerName;
		}

		public void setCustomerName(String customerName) {
			CustomerName = customerName;
		}

		public long getPartnerClassId() {
			return PartnerClassId;
		}

		public void setPartnerClassId(long partnerClassId) {
			PartnerClassId = partnerClassId;
		}

		public long getCurrency_id() {
			return Currency_id;
		}

		public void setCurrency_id(long currency_id) {
			Currency_id = currency_id;
		}

		public long getPaymentMethod_id() {
			return paymentMethod_id;
		}

		public void setPaymentMethod_id(long paymentMethod_id) {
			this.paymentMethod_id = paymentMethod_id;
		}

		public double getCreditLimit() {
			return CreditLimit;
		}

		public void setCreditLimit(double creditLimit) {
			CreditLimit = creditLimit;
		}

		public String getTaxFileNumber() {
			return TaxFileNumber;
		}

		public void setTaxFileNumber(String taxFileNumber) {
			TaxFileNumber = taxFileNumber;
		}

		public String getCommercialRecord() {
			return CommercialRecord;
		}

		public void setCommercialRecord(String commercialRecord) {
			CommercialRecord = commercialRecord;
		}

		public String getTaxCardNo() {
			return TaxCardNo;
		}

		public void setTaxCardNo(String taxCardNo) {
			TaxCardNo = taxCardNo;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getFaxNo() {
			return FaxNo;
		}

		public void setFaxNo(String faxNo) {
			FaxNo = faxNo;
		}

		public String getURL() {
			return URL;
		}

		public void setURL(String uRL) {
			URL = uRL;
		}

		public long getActiveStatusId() {
			return ActiveStatusId;
		}

		public void setActiveStatusId(long activeStatusId) {
			ActiveStatusId = activeStatusId;
		}

		public Date getEndDate() {
			return EndDate;
		}

		public void setEndDate(Date endDate) {
			EndDate = endDate;
		}

		public Date getStartDate() {
			return StartDate;
		}

		public void setStartDate(Date startDate) {
			StartDate = startDate;
		}

		public long getCreatedBy() {
			return CreatedBy;
		}

		public void setCreatedBy(long createdBy) {
			CreatedBy = createdBy;
		}

		public Date getCreationDate() {
			return CreationDate;
		}

		public void setCreationDate(Date creationDate) {
			CreationDate = creationDate;
		}

		public long getLastUpdatedBy() {
			return LastUpdatedBy;
		}

		public void setLastUpdatedBy(long lastUpdatedBy) {
			LastUpdatedBy = lastUpdatedBy;
		}

		public Date getLastUpdateDate() {
			return LastUpdateDate;
		}

		public void setLastUpdateDate(Date lastUpdateDate) {
			LastUpdateDate = lastUpdateDate;
		}

		public long getCustomerTypeId() {
			return CustomerTypeId;
		}

		public void setCustomerTypeId(long customerTypeId) {
			CustomerTypeId = customerTypeId;
		}

		public String VerificationCode() {
			return VerificationCode;
		}

		public void setVerificationCode(String verificationCode) {
			VerificationCode = verificationCode;
		}
	    
	    
	}
		 	
	  
