package online.ordering.lookup;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="SYS_LOOKUP_TYPES")
public class SYS_LOOKUP_TYPES {

	@Id    
    @Column(name="LOOKUP_TYPE" )   
	private String Lookup_Type;
	
	@Column( name="APPLICATION_ID")
	private long ApplicationID;
	
	@Column( name="LOOKUP_RANK")
	private int LookupRank;
	
	@Column( name="USER_SYSTEM_FLAG")
	private char UserSystemFlag;
	
	@Column( name="HAS_CHILD_FLAG")
	private int HasChildFlag;
	
	    
    @Column( name="PARENT_LOOKUP_TYPE")   
	private String PARENT_LOOKUP_TYPE;
    
    
	public String getLookup_Type() {
		return Lookup_Type;
	}

	public void setLookup_Type(String lookup_Type) {
		Lookup_Type = lookup_Type;
	}

	public String getPARENT_LOOKUP_TYPE() {
		return PARENT_LOOKUP_TYPE;
	}

	public void setPARENT_LOOKUP_TYPE(String pARENT_LOOKUP_TYPE) {
		PARENT_LOOKUP_TYPE = pARENT_LOOKUP_TYPE;
	}

	public long getApplicationID() {
		return ApplicationID;
	}

	public void setApplicationID(long applicationID) {
		ApplicationID = applicationID;
	}

	public int getLookupRank() {
		return LookupRank;
	}

	public void setLookupRank(int lookupRank) {
		LookupRank = lookupRank;
	}

	public char getUserSystemFlag() {
		return UserSystemFlag;
	}

	public void setUserSystemFlag(char userSystemFlag) {
		UserSystemFlag = userSystemFlag;
	}

	public int getHasChildFlag() {
		return HasChildFlag;
	}

	public void setHasChildFlag(int hasChildFlag) {
		HasChildFlag = hasChildFlag;
	}

	
	
    
}








