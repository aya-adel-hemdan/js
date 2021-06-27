package online.ordering.model;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;

@Entity
@Table(name = "sal_customer_documents")
public class Customer_Documents {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="DOC_ID") 
	private long docId;
	
	@Column(name="CUSTOMER_ID")
	private long customerId;

	@Column(name="DOC_TYPE_ID")
	private long DOC_TYPE_ID;
	
	@Column(name="COUNTRY_ID")
	private long COUNTRY_ID;
	
	@Column(name="ISSUE_DATE")
	private Date ISSUE_DATE;
	
	@Column(name="ISSUE_END_DATE")
	private Date ISSUE_END_DATE;
	
	@Column(name="DOCUMENT_PHOTO_PATH")
	private String DOCUMENT_PHOTO_PATH;
	
	@Column(name="REMARKS")
	private String REMARKS;
	
	@Column(name="CREATED_BY") 
    private long CreatedBy;

    @Column(name="CREATION_DATE") 
    private Date CreationDate;
    
    @Column(name="LAST_UPDATE_BY") 
    private long LastUpdatedBy;
    
    @Column(name="LAST_UPDATE_DATE") 
    private Date LastUpdateDate;

	public long getDocId() {
		return docId;
	}

	public void setDocId(long DocId) {
		docId = DocId;
	}

	public long getCustomer_id() {
		return customerId;
	}

	public void setCustomer_id(long customer_id) {
		this.customerId = customer_id;
	}

	public long getDOC_TYPE_ID() {
		return DOC_TYPE_ID;
	}

	public void setDOC_TYPE_ID(long dOC_TYPE_ID) {
		DOC_TYPE_ID = dOC_TYPE_ID;
	}

	public long getCOUNTRY_ID() {
		return COUNTRY_ID;
	}

	public void setCOUNTRY_ID(long cOUNTRY_ID) {
		COUNTRY_ID = cOUNTRY_ID;
	}

	public Date getISSUE_DATE() {
		return ISSUE_DATE;
	}

	public void setISSUE_DATE(Date iSSUE_DATE) {
		ISSUE_DATE = iSSUE_DATE;
	}

	public Date getISSUE_END_DATE() {
		return ISSUE_END_DATE;
	}

	public void setISSUE_END_DATE(Date iSSUE_END_DATE) {
		ISSUE_END_DATE = iSSUE_END_DATE;
	}

	public String getDOCUMENT_PHOTO_PATH() {
		return DOCUMENT_PHOTO_PATH;
	}

	public void setDOCUMENT_PHOTO_PATH(String dOCUMENT_PHOTO_PATH) {
		DOCUMENT_PHOTO_PATH = dOCUMENT_PHOTO_PATH;
	}

	public String getREMARKS() {
		return REMARKS;
	}

	public void setREMARKS(String rEMARKS) {
		REMARKS = rEMARKS;
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
    
    
}

